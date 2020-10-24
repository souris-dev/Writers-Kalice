package com.writerskalice.server.dao;

import com.writerskalice.server.models.getmodels.Comment;
import com.writerskalice.server.models.getmodels.Post;
import com.writerskalice.server.models.postmodels.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.sql.Date;
import java.util.stream.Collectors;

@Repository
public class PostRepository implements IPostDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Post retrievePost(Integer postId) {
        System.out.println("select post_id, title, content, n_pos_rcn, n_neg_rcn, n_comments, anonymous, postedby_username, posted_date " +
                "from getpost_view_com_rcn_int " +
                "where post_id = " + postId.toString() + ";");

        Map<String, Object> res1 = jdbcTemplate.queryForObject("select post_id, title, content, anonymous, postedby_uid, posted_date " +
                        "from posts " +
                "where post_id = ?;", new Object[]{postId},
                (rs, rn) -> {
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.put("postId", rs.getInt(1));
                    resultMap.put("title", rs.getString(2));
                    resultMap.put("content", rs.getString(3));
                    resultMap.put("anonymous", rs.getBoolean(4));
                    resultMap.put("postedbyUid", rs.getInt(5));
                    resultMap.put("postedDate", rs.getDate(6));
                    return resultMap;
                });

        assert res1 != null;
        res1.put("postedbyUsername", jdbcTemplate.queryForObject("select username from users_table where user_id = ?;",
                new Object[]{(Integer) res1.get("postedbyUid")},
                (rs, rn) -> rs.getString(1)));

        String reactionQuery = "select COALESCE(SUM(CASE rcn.pos_neg WHEN 'positive' THEN 1 ELSE 0 END), 0) AS n_pos_rcn, " +
                "COALESCE(SUM (CASE rcn.pos_neg WHEN 'negative' THEN 1 ELSE 0 END), 0) AS n_neg_rcn " +
                "from post_reactions prcn, reactions as rcn where prcn.reaction_id = rcn.reaction_id and prcn.post_id = ?;";

        Map<String, Object> reactionsNComments = jdbcTemplate.queryForObject(reactionQuery, new Object[]{postId},
                (rs, rn) -> {
                    Map<String, Object> resMap = new HashMap<>();
                    resMap.put("nPosReactions", rs.getInt(1));
                    resMap.put("nNegReactions", rs.getInt(2));

                    return resMap;
                });

        assert reactionsNComments != null;
        reactionsNComments.put("nComments", jdbcTemplate.queryForObject("select coalesce(count(comment_id), 0) from post_comments " +
                "where post_id = ?", new Object[]{postId}, (rs, rn) -> rs.getInt(1)));

        /*Map<String, Object> res = jdbcTemplate.queryForObject(
                "select post_id, title, content, n_pos_rcn, n_neg_rcn, n_comments, anonymous, postedby_username, posted_date " +
                        "from getpost_view_com_rcn_int " +
                        "where post_id = ?;", new Object[]{postId},
                (rs, rowNumber) -> {
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.put("postId", rs.getInt(1));
                    resultMap.put("title", rs.getString(2));
                    resultMap.put("content", rs.getInt(3));
                    resultMap.put("nPosReactions", rs.getInt(4));
                    resultMap.put("nNegReactions", rs.getInt(5));
                    resultMap.put("nComments", rs.getInt(6));
                    resultMap.put("anonymous", rs.getBoolean(7));
                    resultMap.put("postedbyUsername", rs.getString(8));
                    resultMap.put("postedDate", rs.getDate(9));

                    return resultMap;
                });*/

        Post post = new Post();
        post.setId(postId);
        post.setTitle((String) res1.get("title"));
        post.setContent((String) res1.get("content"));
        post.setAnonymous((Boolean) res1.get("anonymous"));
        post.setNPosReactions((Integer) reactionsNComments.get("nPosReactions"));
        post.setNNegReactions((Integer) reactionsNComments.get("nNegReactions"));
        post.setNComments((Integer) reactionsNComments.get("nComments"));
        post.setPostedbyUsername((String) res1.get("postedbyUsername"));
        post.setPostedOn((Date) res1.get("postedDate"));

        List<Map<String, Object>> resInterests = jdbcTemplate.queryForList(
                "select description as interest from posts_get_interest_tags where post_id = ?;", postId);

        ArrayList<String> interestTags = resInterests.stream()
                .map((interestMap) -> (String) interestMap.get("interest"))
                .collect(Collectors.toCollection(ArrayList::new));

        post.setTags(interestTags);

        return post;
    }

    @Override
    public ArrayList<Post> retrieveSavedPosts(Integer userId) {
        // First retrieve the saved post IDs
        ArrayList<Integer> tempPosts = jdbcTemplate.queryForList(
                "select user_id, post_id from saved_posts where user_id = ?", userId)
                .stream().map((mapObj) -> (Integer) mapObj.get("post_id"))
                    .collect(Collectors.toCollection(ArrayList::new));

        // then retrieve the actual posts and send them
        return tempPosts.stream().map(this::retrievePost)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @Override
    public ArrayList<Post> retrieveFeed(Integer userId) {
        // First check if the user is above eighteen or not
        Boolean isAboveEighteen = jdbcTemplate.queryForObject(
                "select is_above_eighteen from profiles where user_id = ?",
                new Object[]{userId}, (rs, rn) -> rs.getBoolean(1)
        );

        // Next find the list of post IDs that have been seen by the user
        ArrayList<Integer> postIdsSeen = jdbcTemplate.queryForList(
                "select post_id from seen_posts where user_id = ?", userId)
                .stream().map((stringObjectMap) -> (Integer) stringObjectMap.get("post_id"))
                .collect(Collectors.toCollection(ArrayList::new));

        StringBuilder postIdsSeenStr = new StringBuilder();

        for (Integer i : postIdsSeen) {
            postIdsSeenStr.append(i.toString()).append(", ");
        }

        System.out.println(postIdsSeenStr.length());

        // Now, get all the post Ids that do not have their post ids in postIdsSeen
        // ordered by their recency

        ArrayList<Integer> feedIds;

        // Check for above eighteen stuff
        if (isAboveEighteen && postIdsSeenStr.length() > 1) {
            // Delete last two characters
            postIdsSeenStr.deleteCharAt(postIdsSeenStr.length() - 1);
            postIdsSeenStr.deleteCharAt(postIdsSeenStr.length() - 1);

             feedIds = jdbcTemplate.queryForList(
                    "select post_id from posts where post_id not in (?)" +
                            " order by posted_date desc;",
                    postIdsSeenStr).stream().map((mapObj) -> (Integer) mapObj.get("post_id"))
                    .collect(Collectors.toCollection(ArrayList::new));
        }
        if (isAboveEighteen && postIdsSeenStr.length() < 1) {

            feedIds = jdbcTemplate.queryForList(
                    "select post_id from posts" +
                            " order by posted_date desc;")
                    .stream().map((mapObj) -> (Integer) mapObj.get("post_id"))
                    .collect(Collectors.toCollection(ArrayList::new));
        }
        else {
            feedIds = jdbcTemplate.queryForList(
                    "select post_id from posts where post_id not in (?)" +
                            " and is_above_eighteen = false order by posted_date desc;",
                    postIdsSeenStr).stream().map((mapObj) -> (Integer) mapObj.get("post_id"))
                    .collect(Collectors.toCollection(ArrayList::new));
        }

        // Now retrieve the post data
        @SuppressWarnings("UnnecessaryLocalVariable")
        ArrayList<Post> feed = feedIds.stream().map(this::retrievePost)
                .collect(Collectors.toCollection(ArrayList::new));

        return feed;
    }

    @Override
    public ArrayList<Comment> retrieveComments(Integer postId) {

        return jdbcTemplate.queryForList(
                "select content, postedby_username, anonymous from get_comments where post_id = ? order by posted_dt_tm desc;",
                postId).stream().map((resmap) ->
                new Comment((String) resmap.get("content"),
                        (String) resmap.get("postedby_username"), (Boolean) resmap.get("anonymous")))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @Override
    @Transactional
    public Boolean createNewPost(CreatePostData postData) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date date = new java.util.Date();

        KeyHolder keyHolder = new GeneratedKeyHolder();

        String statement = "insert into posts(title, content, anonymous, min_rank, posted_date, is_above_eighteen, postedby_uid)" +
                " values (?, ?, ?, 0, ?, ?, ?)";

        Boolean success = jdbcTemplate.update(
                con -> {
                    PreparedStatement ps = con.prepareStatement(statement, new String[] {"post_id"});
                    ps.setString(1, postData.getTitle());
                    ps.setString(2, postData.getContent());
                    ps.setBoolean(3, postData.getAnonymous());
                    ps.setDate(4, java.sql.Date.valueOf(dateFormat.format(date)));
                    ps.setBoolean(5, postData.getIsAboveEighteen());
                    ps.setInt(6, postData.getPostedbyUid());

                    return ps;
                }, keyHolder) > 0;

        Integer postId = Objects.requireNonNull(keyHolder.getKey()).intValue();

        for (Integer interestId : postData.getTags()) {
            success = ((jdbcTemplate.update("insert into post_interests values (?, ?)",
                    postId, interestId)) > 0) && success;
        }

        return success;
    }

    @Override
    public Boolean reactOnPost(ReactOnPostData reactionData) {
        return jdbcTemplate.update("insert into post_reactions(user_id, post_id, reaction_id) " +
                "values (?, ?, ?);", reactionData.getReactedbyUid(), reactionData.getReactedonPid(),
                reactionData.getReactionId()) > 0;
    }

    @Override
    public Boolean commentOnPost(CreateCommentData commentData) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        java.util.Date date = new java.util.Date();

        /*String dateVal = "\"" + dateFormat.format(date) + " +05:30" + "\"";
        String commentInsertQ = "insert into comments(content, posted_dt_tm, anonymous) " +
                "values " +
                "(\"" + commentData.getContent()  + "\", " + dateVal + ", ?)";*/

        String commentInsertQ = "insert into comments(content, posted_dt_tm, anonymous) values (?, NOW(), ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        boolean success = jdbcTemplate.update(
                con -> {
                    PreparedStatement ps = con.prepareStatement(commentInsertQ, new String[] {"comment_id"});
                    ps.setString(1, commentData.getContent());
                    ps.setBoolean(2, commentData.getIsAnonymous());

                    return ps;
                }, keyHolder) > 0;

        String postCommentsInsertQ = "insert into post_comments(user_id, post_id, comment_id) values(?, ?, ?)";

        Integer commentId = Objects.requireNonNull(keyHolder.getKey()).intValue();
        success = (jdbcTemplate.update(postCommentsInsertQ, commentData.getPostedbyUid(), commentData.getPostedonPid(), commentId) > 0) && success;

        return success;
    }

    @Override
    public Boolean setPostSeen(SetSeenData seenData) {
        return jdbcTemplate.update("insert into seen_posts(user_id, post_id) values (?, ?);",
                seenData.getUserId(), seenData.getPostId()) > 0;
    }

    @Override
    public Boolean addSavedPost(SavePostData savePostData) {
        return jdbcTemplate.update("insert into saved_posts(user_id, post_id) values (?, ?);",
                savePostData.getUserId(), savePostData.getUserId()) > 0;
    }
}

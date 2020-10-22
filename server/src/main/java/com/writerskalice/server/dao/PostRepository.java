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
        Map<String, Object> res = jdbcTemplate.queryForObject(
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
                });

        Post post = new Post();
        post.setId(postId);
        post.setTitle((String) res.get("title"));
        post.setContent((String) res.get("content"));
        post.setAnonymous((Boolean) res.get("anonymous"));
        post.setNPosReactions((Integer) res.get("nPosReactions"));
        post.setNNegReactions((Integer) res.get("nNegReactions"));
        post.setNComments((Integer) res.get("nComments"));
        post.setPostedbyUsername((String) res.get("postedbyUsername"));
        post.setPostedOn((Date) res.get("postedDate"));

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
                "select content, postedby_username, anonymous from get_comments where post_id = ?;",
                postId).stream().map((resmap) ->
                new Comment((String) resmap.get("content"),
                        (String) resmap.get("postedbyUsername"), (Boolean) resmap.get("anonymous")))
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
                "values (?, ?, ?);" + reactionData.getReactedbyUid(), reactionData.getReactedonPid(),
                reactionData.getReactionId()) > 0;
    }

    @Override
    public Boolean commentOnPost(CreateCommentData commentData) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        java.util.Date date = new java.util.Date();

        return jdbcTemplate.update("insert into comments(content, posted_dt_tm, anonymous) values (?, ?, ?)",
                    commentData.getContent(), dateFormat.format(date) + " +05:30", commentData.getIsAnonymous()) > 0;
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

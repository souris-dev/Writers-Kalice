package com.writerskalice.server.dao;

import com.writerskalice.server.models.getmodels.Comment;
import com.writerskalice.server.models.getmodels.Post;
import com.writerskalice.server.models.postmodels.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.sql.Date;
import java.util.stream.Collectors;

@Repository
public class PostRepository implements IPostDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Post retrievePost(Integer postId) {
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

        // Delete last two characters
        postIdsSeenStr.deleteCharAt(postIdsSeenStr.length() - 1);
        postIdsSeenStr.deleteCharAt(postIdsSeenStr.length() - 1);

        // Now, get all the post Ids that do not have their post ids in postIdsSeen
        // ordered by their recency

        ArrayList<Integer> feedIds;

        // Check for above eighteen stuff
        if (isAboveEighteen) {
             feedIds = jdbcTemplate.queryForList(
                    "select post_id from posts where post_id not in (?)" +
                            " order by posted_date desc;",
                    postIdsSeenStr).stream().map((mapObj) -> (Integer) mapObj.get("post_id"))
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
    public Boolean createNewPost(CreatePostData postData) {
        return null;
    }

    @Override
    public Boolean reactOnPost(ReactOnPostData reactionData) {
        return null;
    }

    @Override
    public Boolean commentOnPost(CreateCommentData commentData) {
        return null;
    }

    @Override
    public Boolean setPostSeen(SetSeenData seenData) {
        return null;
    }

    @Override
    public Boolean addSavedPost(SavePostData savePostData) {
        return null;
    }
}

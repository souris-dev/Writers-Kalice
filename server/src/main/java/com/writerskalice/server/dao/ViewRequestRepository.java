package com.writerskalice.server.dao;

import com.writerskalice.server.models.deletemodels.ViewRequestSeenData;
import com.writerskalice.server.models.getmodels.Post;
import com.writerskalice.server.models.getmodels.ViewRequestPost;
import com.writerskalice.server.models.postmodels.SendViewRequestData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class ViewRequestRepository implements IViewRequestDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Boolean setViewRequestSeen(ViewRequestSeenData vrSeenData) {
        Integer senttoUid = jdbcTemplate.queryForObject("select user_id from users_table where username = ?", new Object[]{vrSeenData.getSenttoUsername()},
                (rs, rn) -> rs.getInt(1));

        return jdbcTemplate.update("delete from view_requests where post_id = ? and from_user_id = ? and to_user_id = ?",
                vrSeenData.getPostId(), vrSeenData.getSentbyUid(), senttoUid) > 0;
    }

    @Override
    public ArrayList<ViewRequestPost> retrieveViewRequestPosts(Integer userId) {
        ArrayList<Map<String, Integer>> vrPostIds = jdbcTemplate.queryForList(
                "select post_id, from_user_id from view_requests where to_user_id = ?", userId)
                .stream().map((mapObj) -> {
                    Map<String, Integer> resM = new HashMap<>();
                    resM.put("fromId", (Integer) mapObj.get("from_user_id"));
                    resM.put("postId", (Integer) mapObj.get("post_id"));
                    return resM;
                })
                .collect(Collectors.toCollection(ArrayList::new));

        ArrayList<Post> posts = vrPostIds.stream().map((mapObj) -> postRepository.retrievePost(mapObj.get("postId")))
                .collect(Collectors.toCollection(ArrayList::new));

        ArrayList<String> sentbyUsernames = vrPostIds.stream().map(
                (mapObj) -> jdbcTemplate.queryForObject("select username from users_table where user_id = ?",
                            new Object[]{(Integer) mapObj.get("fromId")},
                            (rs, rn) -> rs.getString(1))).collect(Collectors.toCollection(ArrayList::new));

        ArrayList<ViewRequestPost> vrPosts = new ArrayList<>();

        for (int i = 0; i < posts.size(); i++) {
            ViewRequestPost vrP = new ViewRequestPost(sentbyUsernames.get(i));
            vrP.setAnonymous(posts.get(i).getAnonymous());
            Post tempP = posts.get(i);
            vrP.setContent(tempP.getContent());
            vrP.setId(tempP.getId());
            vrP.setNComments(tempP.getNComments());
            vrP.setNNegReactions(tempP.getNNegReactions());
            vrP.setNPosReactions(tempP.getNPosReactions());
            vrP.setPostedbyUsername(tempP.getPostedbyUsername());
            vrP.setPostedOn(tempP.getPostedOn());
            vrP.setTitle(tempP.getTitle());
            vrP.setTags(tempP.getTags());

            vrPosts.add(vrP);
        }

        return vrPosts;
    }

    @Override
    public Boolean sendViewRequest(SendViewRequestData sendViewRequestData) {
        Integer senttoUid = jdbcTemplate.queryForObject("select user_id from users_table where username = ?", new Object[]{sendViewRequestData.getUsernameToSend()},
                (rs, rn) -> rs.getInt(1));

        return jdbcTemplate.update("insert into view_requests values(?, ?, ?, NOW())",
                sendViewRequestData.getSentbyUid(), senttoUid, sendViewRequestData.getPostId()) > 0;
    }
}

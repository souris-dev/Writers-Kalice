package com.writerskalice.server.dao;

import com.writerskalice.server.models.postmodels.*;
import com.writerskalice.server.models.getmodels.Post;
import com.writerskalice.server.models.getmodels.Comment;

import java.util.ArrayList;

public interface IPostDao {
    Post retrievePost(Integer postId);
    ArrayList<Post> retrieveSavedPosts(Integer userId);
    ArrayList<Post> retrieveFeed(Integer userId);
    ArrayList<Comment> retrieveComments(Integer postId);

    Boolean createNewPost(CreatePostData postData);
    Boolean reactOnPost(ReactOnPostData reactionData);
    Boolean commentOnPost(CreateCommentData commentData);

    Boolean setPostSeen(SetSeenData seenData);

    Boolean addSavedPost(SavePostData savePostData);
    // In the above function, save a post only if it isn't aready there
}

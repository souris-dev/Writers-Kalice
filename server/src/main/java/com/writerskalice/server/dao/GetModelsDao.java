package com.writerskalice.server.dao;


import com.writerskalice.server.models.getmodels.Comment;
import com.writerskalice.server.models.getmodels.Post;

import java.util.List;

public interface GetModelsDao {
    public List<Comment> getComment(Integer postId);
    public Post getPost(Integer postId);
}

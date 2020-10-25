package com.writerskalice.server.dao;

import com.writerskalice.server.models.deletemodels.ViewRequestSeenData;
import com.writerskalice.server.models.getmodels.ViewRequestPost;
import com.writerskalice.server.models.postmodels.SendViewRequestData;

import java.util.ArrayList;

public interface IViewRequestDao {
    Boolean setViewRequestSeen(ViewRequestSeenData vrSeenData);
    ArrayList<ViewRequestPost> retrieveViewRequestPosts(Integer userId);
    Boolean sendViewRequest(SendViewRequestData sendViewRequestData);
}

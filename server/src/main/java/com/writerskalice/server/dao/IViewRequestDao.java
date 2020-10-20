package com.writerskalice.server.dao;

import com.writerskalice.server.models.deletemodels.ViewRequestSeenData;
import com.writerskalice.server.models.getmodels.ViewRequestPost;
import com.writerskalice.server.models.postmodels.SendViewRequestData;

public interface IViewRequestDao {
    Boolean setViewRequestSeen(ViewRequestSeenData vrSeenData);
    ViewRequestPost retrieveViewRequestPost(Integer userId);
    Boolean sendViewRequest(SendViewRequestData sendViewRequestData);
}

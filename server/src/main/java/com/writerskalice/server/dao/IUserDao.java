package com.writerskalice.server.dao;

import com.writerskalice.server.models.getmodels.UserDisplayProfile;
import com.writerskalice.server.models.getmodels.UserProfileSettings;
import com.writerskalice.server.models.postmodels.CreateUserProfileData;
import com.writerskalice.server.models.postmodels.UpdateProfileData;

import java.util.Map;

public interface IUserDao {
    UserDisplayProfile retrieveUserDisplay(Integer uid);
    UserProfileSettings retrieveUserProfileSettings(Integer uid);

    Map<String, Object> createUserProfile(CreateUserProfileData data);
    Boolean updateUserProfile(UpdateProfileData data);

    Map<String, Object> checkUserCreds(String username, String password);
}
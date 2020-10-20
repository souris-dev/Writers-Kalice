package com.writerskalice.server.dao;

import com.writerskalice.server.models.getmodels.UserDisplayProfile;
import com.writerskalice.server.models.getmodels.UserProfileSettings;
import com.writerskalice.server.models.postmodels.CreateUserProfileData;
import com.writerskalice.server.models.postmodels.UpdateProfileData;

public interface IUserDao {
    UserDisplayProfile retrieveUserDisplay(Integer uid);
    UserProfileSettings retrieveUserProfileSettings(Integer uid);

    Boolean createUserProfile(CreateUserProfileData data);
    Boolean updateUserProfile(UpdateProfileData data);

    Boolean checkUserCreds(String username, String password);
}
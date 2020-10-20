package com.writerskalice.server.dao;

import com.writerskalice.server.models.getmodels.UserDisplayProfile;
import com.writerskalice.server.models.getmodels.UserProfileSettings;
import com.writerskalice.server.models.postmodels.CreateUserProfileData;
import com.writerskalice.server.models.postmodels.UpdateProfileData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository implements IUserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UserDisplayProfile retrieveUserDisplay(Integer uid) {
        Map<String, Object> res =
                jdbcTemplate.queryForObject("select name, username, rank_id, rank_desc, num_stars, about_me as bio, show_name, show_bio, show_interests " +
                                "from profile_display " + "where user_id = ?;", new Object[]{uid},
                (rs, rowNum) -> {
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.put("name", rs.getString(1));
                    resultMap.put("username", rs.getString(2));
                    resultMap.put("rankId", rs.getInt(3));
                    resultMap.put("rankDesc", rs.getString(4));
                    resultMap.put("numStars", rs.getFloat(5));
                    resultMap.put("bio", rs.getString(6));
                    resultMap.put("showName", rs.getString(7));
                    resultMap.put("showBio", rs.getBoolean(8));
                    resultMap.put("showInterests", rs.getBoolean(9));

                    return resultMap;
                });

        UserDisplayProfile profile = new UserDisplayProfile();

        profile.setName((String) res.get("name"));
        profile.setUsername((String) res.get("username"));
        profile.setBio((String) res.get("bio"));
        profile.setRank((Integer) res.get("rankId"));
        profile.setNumStars((Float) res.get("numStars"));
        profile.setRankDesc((String) res.get("bio"));
        profile.setShowBio((Boolean) res.get("showBio"));
        profile.setShowName((Boolean) res.get("showName"));
        profile.setShowInterests((Boolean) res.get("showInterests"));

        return profile;
    }

    @Override
    public UserProfileSettings retrieveUserProfileSettings(Integer uid) {
        Map<String, Object> res =
                jdbcTemplate.queryForObject("select name, about_me as bio, rank_id, rank_desc, num_stars, show_name, show_bio, show_interests " +
                                "from profile_display where user_id = ?;", new Object[]{uid},
                        (rs, rowNum) -> {
                            Map<String, Object> resultMap = new HashMap<>();
                            resultMap.put("name", rs.getString(1));
                            resultMap.put("bio", rs.getString(2));
                            resultMap.put("rankId", rs.getInt(3));
                            resultMap.put("rankDesc", rs.getString(4));
                            resultMap.put("numStars", rs.getFloat(5));
                            resultMap.put("showName", rs.getString(7));
                            resultMap.put("showBio", rs.getBoolean(8));
                            resultMap.put("showInterests", rs.getBoolean(9));

                            return resultMap;
                        });

        UserProfileSettings profileSettings = new UserProfileSettings();

        profileSettings.setName((String) res.get("name"));
        profileSettings.setBio((String) res.get("bio"));
        profileSettings.setRank((Integer) res.get("rankId"));
        profileSettings.setNumStars((Float) res.get("numStars"));
        profileSettings.setRankDesc((String) res.get("bio"));
        profileSettings.setShowBio((Boolean) res.get("showBio"));
        profileSettings.setShowName((Boolean) res.get("showName"));
        profileSettings.setShowInterests((Boolean) res.get("showInterests"));

        Map<String, Object> res2 =
                jdbcTemplate.queryForObject("select email from user_email_ids where user_id = ?;",
                        new Object[]{uid},
                        (rs, rowNum) -> {
                            Map<String, Object> resultMap = new HashMap<>();
                            resultMap.put("email", rs.getString(1));

                            return resultMap;
                        });

        Map<String, Object> res3 =
                jdbcTemplate.queryForObject("select is_above_eighteen from profiles where user_id = 101;",
                        new Object[]{uid},
                        (rs, rowNum) -> {
                            Map<String, Object> resultMap = new HashMap<>();
                            resultMap.put("isAboveEighteen", rs.getBoolean(1));

                            return resultMap;
                        });

        profileSettings.setEmail((String) res2.get("email"));
        profileSettings.setIsAboveEighteen((Boolean) res3.get("isAboveEighteen"));

        return profileSettings;
    }

    @Override
    public Boolean createUserProfile(CreateUserProfileData data) {
        return null;
    }

    @Override
    public Boolean updateUserProfile(UpdateProfileData data) {
        return null;
    }

    @Override
    public Boolean checkUserCreds(String username, String password) {
        return null;
    }
}

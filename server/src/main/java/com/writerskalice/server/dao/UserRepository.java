package com.writerskalice.server.dao;

import com.writerskalice.server.models.getmodels.UserDisplayProfile;
import com.writerskalice.server.models.getmodels.UserProfileSettings;
import com.writerskalice.server.models.postmodels.CreateUserProfileData;
import com.writerskalice.server.models.postmodels.UpdateProfileData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository implements IUserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UserDisplayProfile retrieveUserDisplay(String username) {
        Integer userId = jdbcTemplate.queryForObject("select user_id from users_table where username = ?",
                new Object[]{username}, (rs, rn) -> rs.getInt(1));

        Map<String, Object> res =
                jdbcTemplate.queryForObject("select name, username, rank_id, rank_desc, num_stars, about_me as bio, show_name, show_bio, show_interests " +
                                "from profile_display " + "where user_id = ?;", new Object[]{userId},
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
    @Transactional
    public Map<String, Object> createUserProfile(CreateUserProfileData data) {
        /*Integer privacyId = jdbcTemplate.queryForObject("select detail_id from privacy_details " +
                "where show_interests = ? and show_name = ? and show_bio = ?",
                new Object[]{data.getShowInterestTags(), data.getShowName(), data.getShowBio()},
                (rs, rn) -> rs.getInt(1));*/

        Integer privacyId = 1;
        System.out.println(privacyId);

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date date = new java.util.Date();

        Boolean success = true;

        System.out.println("Recs inserted: ");
        System.out.println(jdbcTemplate.update("insert into users_table(username, join_date, security_qn, security_ans, privacy_det_id)" +
                " values (?, ?, ?, ?, ?)",
                data.getUsername(), date, '-', '-', privacyId));

        Integer userId = jdbcTemplate.queryForObject("select user_id from users_table where username = ?",
                new Object[]{data.getUsername()}, (rs, rn) -> rs.getInt(1));

        System.out.println(jdbcTemplate.update("insert into user_email_ids values (?, ?);",
                userId, data.getEmail()));

        success = (jdbcTemplate.update("insert into profiles(user_id, name, about_me, is_above_eighteen) values (?, ?, ?, ?)",
                    userId, data.getName(), data.getBio(), data.getIsAboveEighteen()) > 0) && success;

        success = (jdbcTemplate.update("insert into auth_helper_userauths(user_id, passwd) values (?, ?)",
                    userId, data.getPassword()) > 0) && success;

        // Now for profile interests
        for (Integer tagId : data.getTags()) {
            success = (jdbcTemplate.update("insert into profile_interests values (?, ?, ?)", userId, data.getName(), tagId) > 0) && success;
        }

        Map<String, Object> results = new HashMap<>();
        results.put("userId", userId);
        results.put("success", success);

        return results;
    }

    @Override
    public Boolean updateUserProfile(UpdateProfileData data) {
        Integer privacyId = jdbcTemplate.queryForObject("select detail_id from privacy_details " +
                        "where show_interests = ?, show_name = ?, show_bio = ?",
                new Object[]{data.getShowInterestTags(), data.getShowName(), data.getShowBio()},
                (rs, rn) -> rs.getInt(1));

        Boolean success;

        success = jdbcTemplate.update("update users_table set username = ? and privacy_det = ? " +
                        " where user_id = ?;",
                data.getUsername(), privacyId, data.getUid()) > 0;

        success = (jdbcTemplate.update("update user_email_ids set email = ? where user_id = ?;",
                data.getEmail(), data.getUid()) > 0) && success;

        success = (jdbcTemplate.update("update profiles set name = ? and about_me = ? and is_above_eighteen = ? " +
                        "where user_id = ? and name = ?",
                data.getName(), data.getBio(), data.getIsAboveEighteen(), data.getUid(), data.getName()) > 0)
                && success;

        success = (jdbcTemplate.update("update auth_helper_userauth set passwd = ? where user_id = ?",
                data.getPassword(), data.getUid()) > 0) && success;

        // Now for profile interests
        // First delete the existing tags, then re-insert
        success = (jdbcTemplate.update("delete from profile_interests where user_id = ?", data.getUid()) > 0) && success;

        for (Integer tagId : data.getTags()) {
            success = (jdbcTemplate.update("insert into profile_interests values (?, ?, ?)", data.getUid(), data.getName(), tagId) > 0) && success;
        }

        return success;
    }

    @Override
    public Map<String, Object> checkUserCreds(String username, String password) {
        Integer userId = jdbcTemplate.queryForObject("select user_id from users_table where username = ?",
                new Object[]{username}, (rs, rn) -> rs.getInt(1));

        String passdb = jdbcTemplate.queryForObject("select passwd from auth_helper_userauths where user_id = ?",
                new Object[]{userId},
                (rs, rn) -> rs.getString(1));

        assert passdb != null;

        Boolean success = passdb.equals(password);

        Map<String, Object> res = new HashMap<>();
        res.put("userId", userId);
        res.put("success", success);

        return res;
    }
}

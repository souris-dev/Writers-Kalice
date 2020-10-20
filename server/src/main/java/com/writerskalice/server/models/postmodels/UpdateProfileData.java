package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileData {
    private String name;
    private String username;
    private String password;
    private String email;
    private String bio;

    private Boolean isAboveEighteen;
    private Boolean showBio;
    private Boolean showName;
    private Boolean showInterestTags;

    private Integer uid;
    private ArrayList<Integer> tags;
}

package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserProfileData {
    private String username;
    private String password;
    private String name;
    private String email;
    private String bio;
    private Boolean isAboveEighteen;
    private Boolean showInterestTags;
    private Boolean showName;
    private Boolean showBio;
    private ArrayList<Integer> tags;
}

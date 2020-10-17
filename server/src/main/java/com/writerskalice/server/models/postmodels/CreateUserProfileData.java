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
    private String name;
    private String email;
    private String bio;
    private boolean isAboveEighteen;
    private boolean showName;
    private boolean showBio;
    private ArrayList<String> tags;
}

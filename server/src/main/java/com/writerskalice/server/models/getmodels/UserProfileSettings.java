package com.writerskalice.server.models.getmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileSettings {
    private String name;
    private String email;
    private String bio;
    private Integer rank;
    private Float numStars;
    private boolean isAboveEighteen;
    private boolean showBio;
    private boolean showName;
    private ArrayList<String> interestTags;
}

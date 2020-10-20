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
    private String rankDesc;
    private Float numStars;

    private Boolean isAboveEighteen;
    private Boolean showBio;
    private Boolean showName;
    private Boolean showInterests;
    private ArrayList<String> interestTags;
}

package com.writerskalice.server.models.getmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDisplayProfile {
    private String name;
    private String username;
    private Integer rank;
    private String rankDesc;
    private Float numStars;
    private String bio;

    private Boolean showName;
    private Boolean showBio;
    private Boolean showInterests;
}

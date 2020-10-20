package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileData {
    private String name;
    private String username;
    private String password;
    private String email;

    private Boolean isAboveEighteen;
    private Boolean showBio;
    private Boolean showName;

    private Integer uid;
}

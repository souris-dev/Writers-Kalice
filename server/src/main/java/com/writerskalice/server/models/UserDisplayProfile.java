package com.writerskalice.server.models;

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
    private Float numStars;
    private String bio;
}

package com.writerskalice.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private String content;
    private String postedbyUsername;
    private boolean anonymous;
}

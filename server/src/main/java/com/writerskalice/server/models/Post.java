package com.writerskalice.server.models;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private Integer id;
    private String title;
    private String content;
    private Integer nPosReactions;
    private Integer nNegReactions;
    private Integer nComments;
    private boolean anonymous;
    private String postedbyUsername;
    private ArrayList<String> tags;
    private Date postedOn;
}
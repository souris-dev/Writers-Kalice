package com.writerskalice.server.models.getmodels;

import lombok.*;

import java.util.ArrayList;
import java.sql.Date;

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
    private Boolean anonymous;
    private String postedbyUsername;
    private ArrayList<String> tags;
    private Date postedOn;
}
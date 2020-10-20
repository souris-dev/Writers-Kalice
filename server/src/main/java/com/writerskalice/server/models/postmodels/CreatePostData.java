package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePostData {
    private String title;
    private String content;
    private Boolean isAboveEighteen;
    private ArrayList<String> tags;

    private Integer postedbyUid;
    private Boolean anonymous;
}

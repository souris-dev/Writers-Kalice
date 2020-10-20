package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCommentData {
    private String content;
    private Boolean isPositive;
    private Boolean isAnonymous;

    private Integer postedbyUid;
}

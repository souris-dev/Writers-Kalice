package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavePostData {
    private Integer postId;
    private Integer userId;
}

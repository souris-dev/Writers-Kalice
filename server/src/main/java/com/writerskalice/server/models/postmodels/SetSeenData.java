package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetSeenData {
    private Integer userId;
    private Integer postId;
}

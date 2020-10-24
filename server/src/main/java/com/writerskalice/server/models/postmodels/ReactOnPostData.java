package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReactOnPostData {
    private Integer reactedbyUid;
    private Integer reactedonPid;
    private Integer reactionId;
}

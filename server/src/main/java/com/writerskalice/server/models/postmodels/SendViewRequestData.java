package com.writerskalice.server.models.postmodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendViewRequestData {
    private Integer postId;
    private String usernameToSend;
    private String sentbyUid;
}

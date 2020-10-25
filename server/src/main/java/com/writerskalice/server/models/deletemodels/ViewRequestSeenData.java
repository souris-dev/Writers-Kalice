package com.writerskalice.server.models.deletemodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ViewRequestSeenData {
    private Integer sentbyUid;
    private String senttoUsername;
    private Integer postId;
}

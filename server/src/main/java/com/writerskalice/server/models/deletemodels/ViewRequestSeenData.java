package com.writerskalice.server.models.deletemodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ViewRequestSeenData {
    private Integer sentbyUid;
    private Integer senttoUid;
    private Integer postId;
    private Date sentOnDateTime;
}

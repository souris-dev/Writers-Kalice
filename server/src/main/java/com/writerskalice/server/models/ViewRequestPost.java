package com.writerskalice.server.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class ViewRequestPost extends Post {
    @Getter
    @Setter
    private String sentbyUsername;
}
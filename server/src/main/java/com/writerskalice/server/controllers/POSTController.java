package com.writerskalice.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class POSTController {

    @PostMapping("/users/checksignin")
    public ResponseEntity<?> checkSignIn(@RequestParam(name="username") String username,
                                         @RequestParam(name="password") String password) {
        if (username.equals("sachett") && password.equals("lol")) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}

package com.writerskalice.server.controllers;

import com.writerskalice.server.models.postmodels.SetSeenData;
import com.writerskalice.server.models.deletemodels.ViewRequestSeenData;
import com.writerskalice.server.models.postmodels.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/users/createuser")
    public ResponseEntity<?> createUserAndProfile(@RequestBody CreateUserProfileData userProfileData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users/updateprofiledata")
    public ResponseEntity<?> updateUserProfile(@RequestBody UpdateProfileData updateProfileData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users/sendviewrequest")
    public ResponseEntity<?> sendViewRequest(@RequestBody SendViewRequestData sendViewRequestData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/commenton")
    public ResponseEntity<?> commentOnPost(@RequestBody CreateCommentData commentData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/reacton")
    public ResponseEntity<?> reactOnPost(@RequestBody ReactOnPostData reactionData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/createpost")
    public ResponseEntity<?> createPost(@RequestBody CreatePostData postData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/posts/setseen")
    public ResponseEntity<?> setPostSeen(@RequestBody SetSeenData setSeenData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/savepost")
    public ResponseEntity<?> setPostSaved(@RequestBody SavePostData savePostData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/posts/deleteviewrequest")
    public ResponseEntity<?> setViewReqSeen(@RequestBody ViewRequestSeenData vrSeenData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

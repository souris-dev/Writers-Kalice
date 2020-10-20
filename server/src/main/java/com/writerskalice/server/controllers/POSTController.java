package com.writerskalice.server.controllers;

import com.writerskalice.server.dao.PostRepository;
import com.writerskalice.server.dao.UserRepository;
import com.writerskalice.server.models.postmodels.SetSeenData;
import com.writerskalice.server.models.deletemodels.ViewRequestSeenData;
import com.writerskalice.server.models.postmodels.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class POSTController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/users/checksignin")
    public ResponseEntity<?> checkSignIn(@RequestParam(name="username") String username,
                                         @RequestParam(name="password") String password) {
        try {
            var res = userRepository.checkUserCreds(username, password);
            if (!((Boolean)res.get("success")))
                throw new Exception();
            else
                return new ResponseEntity<>(res, HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/users/createuser")
    public ResponseEntity<?> createUserAndProfile(@RequestBody CreateUserProfileData userProfileData) {
        try {
            var res = userRepository.createUserProfile(userProfileData);
            if (!((Boolean)res.get("success")))
                throw new Exception();
            else
                return new ResponseEntity<>(res, HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/users/updateprofiledata")
    public ResponseEntity<?> updateUserProfile(@RequestBody UpdateProfileData updateProfileData) {
        try {
            var res = userRepository.updateUserProfile(updateProfileData);
            if (!res)
                throw new Exception();
            else
                return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/users/sendviewrequest")
    public ResponseEntity<?> sendViewRequest(@RequestBody SendViewRequestData sendViewRequestData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/commenton")
    public ResponseEntity<?> commentOnPost(@RequestBody CreateCommentData commentData) {
        try {
            var res = postRepository.commentOnPost(commentData);
            if (!res)
                throw new Exception();
            else
                return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/posts/reacton")
    public ResponseEntity<?> reactOnPost(@RequestBody ReactOnPostData reactionData) {
        try {
            var res = postRepository.reactOnPost(reactionData);
            if (!res)
                throw new Exception();
            else
                return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/posts/createpost")
    public ResponseEntity<?> createPost(@RequestBody CreatePostData postData) {
        try {
            var res = postRepository.createNewPost(postData);
            if (!res)
                throw new Exception();
            else
                return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping("/posts/setseen")
    public ResponseEntity<?> setPostSeen(@RequestBody SetSeenData setSeenData) {
        try {
            var res = postRepository.setPostSeen(setSeenData);
            if (!res)
                throw new Exception();
            else
                return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/posts/savepost")
    public ResponseEntity<?> setPostSaved(@RequestBody SavePostData savePostData) {
        try {
            var res = postRepository.addSavedPost(savePostData);
            if (!res)
                throw new Exception();
            else
                return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping("/posts/deleteviewrequest")
    public ResponseEntity<?> setViewReqSeen(@RequestBody ViewRequestSeenData vrSeenData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

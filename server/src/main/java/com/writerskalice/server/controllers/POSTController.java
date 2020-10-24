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
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> checkSignIn(@RequestBody SignInDetails details) {
        try {
            var res = userRepository.checkUserCreds(details.getUsername(), details.getPassword());
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
    @CrossOrigin(origins = "http://localhost:3000")
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
    @CrossOrigin(origins = "http://localhost:3000")
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
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> sendViewRequest(@RequestBody SendViewRequestData sendViewRequestData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/commenton")
    @CrossOrigin(origins = "http://localhost:3000")
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
    @CrossOrigin(origins = "http://localhost:3000")
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
            if (e.getMessage().contains("post_reactions_pk"))
                return new ResponseEntity<>("{\"reason\":\"only_once\"}", HttpStatus.ALREADY_REPORTED);
            else
                return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/posts/createpost")
    @CrossOrigin(origins = "http://localhost:3000")
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
    @CrossOrigin(origins = "http://localhost:3000")
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
    @CrossOrigin(origins = "http://localhost:3000")
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
            if (e.getMessage().contains("saved_posts_pk"))
                return new ResponseEntity<>("{\"reason\":\"only_once\"}", HttpStatus.ALREADY_REPORTED);
            else
                return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping("/posts/deleteviewrequest")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> setViewReqSeen(@RequestBody ViewRequestSeenData vrSeenData) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

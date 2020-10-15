package com.writerskalice.server.controllers;

import com.writerskalice.server.models.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
//import org.springframework.web.bind.annotation.Controller;

@RestController
public class MainRESTController {

    @GetMapping("/userhello")
    public String userHello(@RequestParam(name="name", required=false, defaultValue="World!") String name, Model model) {
        model.addAttribute("name", name);
        return "helloPage";
    }

    @GetMapping("/posts/getpost")
    public Post getPost(@RequestParam(name="postId") int postId) {
        Post post = new Post();
        post.setId(postId);
        post.setContent("This is the content of the post");
        post.setTitle("Title");
        post.setNNegReactions(5000);
        post.setNPosReactions(6000);
        post.setNComments(4);
        post.setAnonymous(false);
        post.setPostedbyUsername("sachett");
        try {
            post.setPostedOn(new SimpleDateFormat("dd-MM-yyyy").parse("02-02-2020"));
        }
        catch (ParseException pe) {
            pe.printStackTrace();
        }
        ArrayList<String> tags = new ArrayList<>();
        tags.add("poetry");
        tags.add("parody");
        post.setTags(tags);

        return post;
    }
    
    @GetMapping("/posts/getcomments")
    public ArrayList<Comment> getComments(@RequestParam(name="postId") int postId) {
        ArrayList<Comment> comments = new ArrayList<>();
        comments.add(new Comment("Comment 1", "sachett", false));
        comments.add(new Comment("Comment 2", "sachett", true));
        comments.add(new Comment("Comment 3", "sachett", false));
        comments.add(new Comment("Comment 4", "sachett", false));

        return comments;
    }

    @GetMapping("/posts/getfeed")
    public ArrayList<Post> getFeed(@RequestParam(name="userId") int userId) {
        ArrayList<Post> feedPosts = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            Post post = new Post();
            post.setId(100 + i);
            post.setContent("This is the content of the post");
            post.setTitle("Title");
            post.setNNegReactions(5000);
            post.setNPosReactions(6000);
            post.setNComments(4);
            post.setAnonymous(false);
            post.setPostedbyUsername("sachett");
            try {
                post.setPostedOn(new SimpleDateFormat("dd-MM-yyyy").parse("02-02-2020"));
            }
            catch (ParseException pe) {
                pe.printStackTrace();
            }
            ArrayList<String> tags = new ArrayList<>();
            tags.add("poetry");
            tags.add("parody");
            post.setTags(tags);

            feedPosts.add(post);
        }

        return feedPosts;
    }

    @GetMapping("/posts/getsavedposts")
    public ArrayList<Post> getSavedPosts(@RequestParam(name="userId") int userId) {
        ArrayList<Post> savedPosts = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            Post post = new Post();
            post.setId(100 + i);
            post.setContent("This is the content of the post");
            post.setTitle("Title");
            post.setNNegReactions(5000);
            post.setNPosReactions(6000);
            post.setNComments(4);
            post.setAnonymous(false);
            post.setPostedbyUsername("sachett");
            try {
                post.setPostedOn(new SimpleDateFormat("dd-MM-yyyy").parse("02-02-2020"));
            }
            catch (ParseException pe) {
                pe.printStackTrace();
            }
            ArrayList<String> tags = new ArrayList<>();
            tags.add("poetry");
            tags.add("parody");
            post.setTags(tags);

            savedPosts.add(post);
        }

        return savedPosts;
    }

    @GetMapping("/users/getviewrequests")
    public ArrayList<ViewRequestPost> getViewRequests(@RequestParam(name="userId") int userId) {
        ArrayList<ViewRequestPost> viewReqPosts = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            ViewRequestPost post = new ViewRequestPost();
            post.setId(100 + i);
            post.setContent("This is the content of the post");
            post.setTitle("Title");
            post.setNNegReactions(5000);
            post.setNPosReactions(6000);
            post.setNComments(4);
            post.setAnonymous(false);
            post.setPostedbyUsername("sachett");
            post.setSentbyUsername("sachett");
            try {
                post.setPostedOn(new SimpleDateFormat("dd-MM-yyyy").parse("02-02-2020"));
            }
            catch (ParseException pe) {
                pe.printStackTrace();
            }
            ArrayList<String> tags = new ArrayList<>();
            tags.add("poetry");
            tags.add("parody");
            post.setTags(tags);

            viewReqPosts.add(post);
        }

        return viewReqPosts;
    }

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

    @GetMapping("/users/getprofiledisplay")
    public UserDisplayProfile getUserProfileDisplay(@RequestParam(name="userId") int userId) {
        return new UserDisplayProfile("Souris Ash",
                "sachett", 2, 2f, "A good boy");
    }

    @GetMapping("/users/getprofilesettings")
    public UserProfileSettings getUserProfileSettings(@RequestParam(name="userId") int userId) {
        ArrayList<String> tags = new ArrayList<>();
        tags.add("poetry");
        tags.add("parody");
        return new UserProfileSettings("Souris Ash", "suorees113@gmail.com", "A good boy.", 2,
                2f, true, true, true, tags);
    }
}

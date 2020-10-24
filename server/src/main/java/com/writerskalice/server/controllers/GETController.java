package com.writerskalice.server.controllers;

import com.writerskalice.server.dao.PostRepository;
import com.writerskalice.server.dao.UserRepository;
import com.writerskalice.server.models.getmodels.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
//import org.springframework.web.bind.annotation.Controller;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GETController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/userhello")
    public String userHello(@RequestParam(name="name", required=false, defaultValue="World!") String name, Model model) {
        model.addAttribute("name", name);
        return "helloPage";
    }

    @GetMapping("/posts/getpost")
    @CrossOrigin(origins = "http://localhost:3000")
    public Post getPost(@RequestParam(name="postId") int postId) {
        /*Post post = new Post();
        post.setId(postId);
        post.setContent("This is the content of the post");
        post.setTitle("Title");
        post.setNNegReactions(5000);
        post.setNPosReactions(6000);
        post.setNComments(4);
        post.setAnonymous(false);
        post.setPostedbyUsername("sachett");
        try {
            post.setPostedOn(Date.valueOf("2020-02-02"));
        }
        catch (IllegalArgumentException ille) {
            ille.printStackTrace();
        }
        ArrayList<String> tags = new ArrayList<>();
        tags.add("poetry");
        tags.add("parody");
        post.setTags(tags);*/

        try {
            return postRepository.retrievePost(postId);
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return null;
        }
        catch (Exception ex) {
            return null;
        }
    }
    
    @GetMapping("/posts/getcomments")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<Comment> getComments(@RequestParam(name="postId") int postId) {
        /*ArrayList<Comment> comments = new ArrayList<>();
        comments.add(new Comment("Comment 1", "sachett", false));
        comments.add(new Comment("Comment 2", "sachett", true));
        comments.add(new Comment("Comment 3", "sachett", false));
        comments.add(new Comment("Comment 4", "sachett", false));*/

        try {
            return postRepository.retrieveComments(postId);
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return new ArrayList<Comment>();
        }
        catch (Exception ex) {
            return new ArrayList<Comment>();
        }
    }

    @GetMapping("/posts/getfeed")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<Post> getFeed(@RequestParam(name="userId") int userId) {
        /*ArrayList<Post> feedPosts = new ArrayList<>();

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
                post.setPostedOn(Date.valueOf("2020-02-02"));
            }
            catch (IllegalArgumentException pe) {
                pe.printStackTrace();
            }
            ArrayList<String> tags = new ArrayList<>();
            tags.add("poetry");
            tags.add("parody");
            post.setTags(tags);

            feedPosts.add(post);
        }

        return feedPosts;*/

        try {
            return postRepository.retrieveFeed(userId);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ArrayList<Post>();
        }
    }

    @GetMapping("/posts/getsavedposts")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<Post> getSavedPosts(@RequestParam(name="userId") int userId) {
        /*ArrayList<Post> savedPosts = new ArrayList<>();

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
                post.setPostedOn(Date.valueOf("2020-02-02"));
            }
            catch (IllegalArgumentException pe) {
                pe.printStackTrace();
            }
            ArrayList<String> tags = new ArrayList<>();
            tags.add("poetry");
            tags.add("parody");
            post.setTags(tags);

            savedPosts.add(post);
        }

        return savedPosts;*/

        try {
            return postRepository.retrieveSavedPosts(userId);
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return null;
        }
        catch (Exception ex) {
            return null;
        }
    }

    @GetMapping("/users/getviewrequests")
    @CrossOrigin(origins = "http://localhost:3000")
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
                post.setPostedOn(Date.valueOf("2020-02-02"));
            }
            catch (IllegalArgumentException pe) {
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

    @GetMapping("/users/getprofiledisplay")
    @CrossOrigin(origins = "http://localhost:3000")
    public UserDisplayProfile getUserProfileDisplay(@RequestParam(name="username") String username) {
        /*return new UserDisplayProfile("Souris Ash",
                "sachett", 2, "Rookie", 2f, "A good boy", true, true, true);*/

        System.out.println("Lolololol");

        try {
            System.out.println(username);
            UserDisplayProfile displayProfile = userRepository.retrieveUserDisplay(username);
            System.out.println(displayProfile.toString());
            return displayProfile;
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return null;
        }
        catch (Exception ex) {
            return null;
        }
    }

    @GetMapping("/users/getprofilesettings")
    @CrossOrigin(origins = "http://localhost:3000")
    public UserProfileSettings getUserProfileSettings(@RequestParam(name="userId") int userId) {
        /*ArrayList<String> tags = new ArrayList<>();
        tags.add("poetry");
        tags.add("parody");
        return new UserProfileSettings("Souris Ash", "suorees113@gmail.com", "A good boy", 2,
                "Rookie", 2f,
                true, true, true, true, tags);*/

        try {
            return userRepository.retrieveUserProfileSettings(userId);
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return null;
        }
        catch (Exception ex) {
            return null;
        }
    }
}

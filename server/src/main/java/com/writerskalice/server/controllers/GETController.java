package com.writerskalice.server.controllers;

import com.writerskalice.server.dao.PostRepository;
import com.writerskalice.server.dao.UserRepository;
import com.writerskalice.server.dao.ViewRequestRepository;
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

    @Autowired
    ViewRequestRepository viewRequestRepository;

    @GetMapping("/userhello")
    public String userHello(@RequestParam(name="name", required=false, defaultValue="World!") String name, Model model) {
        model.addAttribute("name", name);
        return "helloPage";
    }

    @GetMapping("/posts/getpost")
    @CrossOrigin(origins = "http://localhost:3000")
    public Post getPost(@RequestParam(name="postId") int postId) {
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
        try {
            return postRepository.retrieveSavedPosts(userId);
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return new ArrayList<>();
        }
        catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @GetMapping("/posts/getseenposts")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<Post> getSeenPosts(@RequestParam(name="userId") int userId) {
        try {
            return postRepository.retrieveSeenPosts(userId);
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return new ArrayList<>();
        }
        catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @GetMapping("/users/getviewrequests")
    @CrossOrigin(origins = "http://localhost:3000")
    public ArrayList<ViewRequestPost> getViewRequests(@RequestParam(name="userId") int userId) {
        try {
            return viewRequestRepository.retrieveViewRequestPosts(userId);
        }
        catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return new ArrayList<>();
        }
        catch (Exception ex) {
            return new ArrayList<>();
        }
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
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}

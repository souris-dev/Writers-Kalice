package com.writerskalice.server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.Controller;

@Controller
public class HelloController {

    @GetMapping("/userhello")
    public String userHello(@RequestParam(name="name", required=false, defaultValue="World!") String name, Model model) {
        model.addAttribute("name", name);
        return "helloPage";
    }
}

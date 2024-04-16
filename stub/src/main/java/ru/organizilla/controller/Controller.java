package ru.organizilla.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/stub")
public class Controller {

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}

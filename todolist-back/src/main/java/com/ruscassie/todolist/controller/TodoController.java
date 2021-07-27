package com.ruscassie.todolist.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todo")
@Slf4j
@Validated
public class TodoController {
    @GetMapping("/hello")
    @ResponseBody
    public ResponseEntity<String> downloadFile() {
        return new ResponseEntity<String>("Hello world", HttpStatus.OK);
    }
}

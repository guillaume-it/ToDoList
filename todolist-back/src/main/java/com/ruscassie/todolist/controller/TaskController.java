package com.ruscassie.todolist.controller;

import com.ruscassie.todolist.dto.TaskElement;
import com.ruscassie.todolist.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@Slf4j
@Validated
public class TaskController {

    @Autowired
    private TaskService taskService;

    /**
     * Load all tasks.
     * @return
     */
    @GetMapping()
    @ResponseBody
    public ResponseEntity<List<TaskElement>> tasks() {
        return new ResponseEntity<List<TaskElement>>(taskService.findAll(), HttpStatus.OK);
    }

    /**
     * Load a task by its id.
     * @param id
     * @return
     */
    @GetMapping(path = "/{id}")
    public ResponseEntity<TaskElement> getTask(@PathVariable final long id) {
        Optional<TaskElement> taskElement = taskService.findById(id);
        if(taskElement.isPresent()){
            return new ResponseEntity<TaskElement>(taskElement.get() ,HttpStatus.OK);
        }
        return new ResponseEntity<TaskElement>( HttpStatus.NO_CONTENT);

    }

    /**
     * Save a task.
     * @param taskElement
     * @return
     */
    @PostMapping()
    public ResponseEntity<Void> saveTask(@RequestBody final TaskElement taskElement) {
        taskService.save(taskElement);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

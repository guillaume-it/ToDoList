package com.ruscassie.todolist.service;

import com.ruscassie.todolist.dto.TaskElement;
import com.ruscassie.todolist.entity.Task;
import com.ruscassie.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Find all task in the DB.
     * @return
     */
    public List<TaskElement> findAll() {

        Iterable<Task> iterable = taskRepository.findAll();
        List<Task> tasks =
                StreamSupport.stream(iterable.spliterator(), false)
                        .collect(Collectors.toList());

        return tasks.stream().map(task ->
            new TaskElement(task.getId(), task.getTitle(), task.getDescription(), task.getDone(),task.getCreate())
        ).collect(Collectors.toCollection(ArrayList::new));

    }

    /**
     * Save or create a task in the DB.
     * @param taskElement
     */
    public void save(TaskElement taskElement) {
        Optional<Task> task = Optional.empty();
        if(taskElement.getId() != null){
            // If the id exist we load the task from the db
             task = taskRepository.findById(taskElement.getId());
            if(task.isPresent()){
                // Then we complete the elements to update without change the id and the created date.
                task.get().setTitle(taskElement.getTitle());
                task.get().setDescription(taskElement.getDescription());
                task.get().setDone(taskElement.getDone());
                taskRepository.save(task.get());
            }
        }
        if(taskElement.getId() == null || !task.isPresent()){
            //In this case we create a new task.
            taskRepository.save(new Task(taskElement.getTitle(),taskElement.getDescription(),taskElement.getDone()));
        }
    }

    /**
     * Find a task by its id.
     * @param id
     * @return
     */
    public Optional<TaskElement> findById(long id) {
       Optional<Task> task = taskRepository.findById(id);
       if(task.isPresent()) {
           return Optional.of(new TaskElement(task.get().getId(), task.get().getTitle(), task.get().getDescription(), task.get().getDone(),task.get().getCreate()));
       }
       return Optional.empty();
    }
}

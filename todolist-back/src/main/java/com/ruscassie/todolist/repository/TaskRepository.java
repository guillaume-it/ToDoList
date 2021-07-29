package com.ruscassie.todolist.repository;

import com.ruscassie.todolist.entity.Task;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {
}

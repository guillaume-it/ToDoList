package com.ruscassie.todolist.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class TaskElement {
    private Long id;
    private String title;
    private String description;
    private Date done;
    private Date create;
}

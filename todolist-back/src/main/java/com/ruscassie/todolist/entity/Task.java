package com.ruscassie.todolist.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Task implements Serializable {

    public Task(String title, String description, Date done) {
        this.title = title;
        this.description = description;
        this.done = done;
        this.create = new Date();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_generator")
    @SequenceGenerator(name = "task_generator", sequenceName = "seq_task_id", allocationSize = 1)
    @Column(columnDefinition = "NUMERIC(19,0)")
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private Date done;

    @Column
    private Date create;
}

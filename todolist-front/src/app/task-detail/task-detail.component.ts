import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../shared/service/task.service';
import { TaskElement } from '../shared/TaskElement';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  task: TaskElement | undefined;
  todoForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TaskService) {
    // init du formulaire
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      //if we have the id then we load the data from the back
      this.todoService.getTask(parseInt(<string>id)).subscribe(task => {
        if (task) {
          this.task = task;
          this.todoForm.get('title')?.setValue(task.title);
          this.todoForm.get('description')?.setValue(task.description);
        }
      });
    }


  }
  onSubmit() {

    // If the title is fulfilled then we can save the task
    if (this.todoForm.valid) {
      const taskElement: TaskElement = {
        id: this.task?.id,
        title: this.todoForm.get('title')?.value,
        description: this.todoForm.get('description')?.value,
        done: this.task?.done
      };

      this.todoService.saveTask(taskElement).subscribe(() =>
        // we are redirecting to the home page
        this.router.navigateByUrl('/')
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TaskElement } from '../shared/TaskElement';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  task: TaskElement | undefined;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      this.task = environment.ELEMENT_DATA[parseInt(<string>id)];
      console.log(this.task);
    }
    if (!this.task) {
      this.router.navigateByUrl('/');
    }
  }

}

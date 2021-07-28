import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../environments/environment';
import { TaskElement } from '../shared/TaskElement';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  displayedColumns: string[] = ['state', 'title'];
  dataSource = new MatTableDataSource<TaskElement>();

  ngOnInit(): void {
    this.dataSource.data = environment.ELEMENT_DATA;
  }

  updateDone(element: TaskElement) {
    const state = !element.done;
    if (state) {
      element.done = new Date();
    } else {
      element.done = undefined;
    }

    this.dataSource.data = this.dataSource.data.sort(this.compareDate);
  }


  compareDate(elem1: TaskElement, elem2: TaskElement) {
    let a = elem1 ? elem1.done : undefined;
    let b = elem2 ? elem2.done : undefined;
    if (a && b) {
      return a > b ? 1 : -1;
    }
    if (!a && b) {
      return -1;
    }
    if (a && !b) {
      return 1;
    }

    return 0;
  }

}

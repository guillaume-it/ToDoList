import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface TaskElement {
  id: number;
  title: string;
  description: string;
  done?: Date;
}
const ELEMENT_DATA: TaskElement[] = [
  { id: 0, title: 'US 1', description: "As a user I would like to list my current todos" },
  { id: 1, title: 'US 2', description: "Change a TODO state" },
  { id: 2, title: 'US 3', description: "Detail a TODO" },
];

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  displayedColumns: string[] = ['state', 'title', 'description'];
  dataSource = new MatTableDataSource<TaskElement>();

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;
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

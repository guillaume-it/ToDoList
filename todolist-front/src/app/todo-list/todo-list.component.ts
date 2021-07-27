import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  displayedColumns: string[] = ['title','state', 'description'];
  dataSource = ELEMENT_DATA;
}
export interface TaskElement {
  title: string;
  position: number;
  description: string;
  state: boolean;
}

const ELEMENT_DATA: TaskElement[] = [
  { position: 1, title: 'US 1', state:false, description: "As a user I would like to list my current todos" },
  { position: 2, title: 'US 2', state:false, description: "Change a TODO state" },
];

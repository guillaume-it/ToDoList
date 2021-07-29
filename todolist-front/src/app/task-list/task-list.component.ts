import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../shared/service/task.service';
import { TaskElement } from '../shared/TaskElement';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TodoListComponent implements OnInit {

  displayedColumns: string[] = ['state', 'title'];
  dataSource = new MatTableDataSource<TaskElement>();

  constructor(private todoService: TaskService) { }

  ngOnInit(): void {
    //We load the tasks
    this.todoService.getTasks().subscribe(todos => {
      this.dataSource.data = this.orderData(todos);
    });
  }

  /**
   * Update the date of a task done.
   */
  updateDone(element: TaskElement) {
    const state = !element.done;
    if (state) {
      element.done = new Date();
    } else {
      element.done = undefined;
    }

    this.dataSource.data = this.orderData(this.dataSource.data);
  }

  /**
   * Order the task in function of the creation date and the done date.
   */
  orderData(data: TaskElement[]) {
    const dataCreate = data.filter(task => !!task.create && !task.done).sort(this.compareCreateDate);
    const dataOther = data.filter(task => !task.done && !task.create);
    const dataDone = data.filter(task => !!task.done).sort(this.compareDoneDate);

    return dataCreate.concat(dataOther).concat(dataDone);
  }

  /**
   * Compare the done date.
   */
  compareDoneDate(elem1: TaskElement, elem2: TaskElement) {
    let a = elem1 ? elem1.done : undefined;
    let b = elem2 ? elem2.done : undefined;

    return compareDate(a, b);
  }

  /**
   * Compare the create date.
   */
  compareCreateDate(elem1: TaskElement, elem2: TaskElement) {
    let a = elem1 ? elem1.create : undefined;
    let b = elem2 ? elem2.create : undefined;

    return compareDate(b, a);
  }

}

/**
 * Compare the date.
 */
export function compareDate(a: Date | undefined, b: Date | undefined) {
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

/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { compareDate, TodoListComponent } from './task-list.component';
import { AppModule } from '../app.module';
import { TaskElement } from '../shared/TaskElement';

const ELEMENT_DATA: TaskElement[] = [
  { id: 0, title: 'US 1 : List my TODOs', description: "As a user I would like to list my current todos" },
  { id: 1, title: 'US 2 : Change a TODO state', description: "As a user I would like to change a todo state by checking a \"box\"", done: new Date("2021-07-28T00:00:00.000+00:00") },
  {
    id: 2, title: 'US 3 : Detail a TODO', description: "As a user I would like to display one of my todo in a separate or dedicated view.This todo will contain its title and a description(which is a new information not shown in the previous view).", create: new Date("2021-07-28T00:00:00.000+00:00")
  }
];

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [AppModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compareDate', () => {
    expect(compareDate(new Date(), new Date())).toBe(-1);
  });

  it('should orderData', () => {
    const data = fixture.componentInstance.orderData(ELEMENT_DATA);

    expect(data[0].id).toBe(2);
    expect(data[1].id).toBe(0);
    expect(data[2].id).toBe(1);
  });
});

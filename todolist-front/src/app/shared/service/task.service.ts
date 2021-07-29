import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaskElement } from '../TaskElement';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(protected http: HttpClient) {

  }

  getTask(id: number): Observable<TaskElement> {
    return this.http.get<TaskElement>(`${environment.api}tasks/${id}`, {});
  }

  getTasks(): Observable<TaskElement[]> {
    return this.http.get<TaskElement[]>(`${environment.api}tasks`, {});
  }

  saveTask(taskElement: TaskElement): Observable<void> {
    return this.http.post<void>(`${environment.api}tasks`, taskElement);
  }
}

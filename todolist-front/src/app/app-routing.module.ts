import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { TodoDetailComponent } from './task-detail/task-detail.component';
import { TodoListComponent } from './task-list/task-list.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TodoListComponent },
    { path: 'tasks/:id', component: TodoDetailComponent },
    { path: 'tasks/add', component: TodoDetailComponent }
  ]
}
];


@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: !environment.production,
      useHash: true,
      relativeLinkResolution: 'legacy'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

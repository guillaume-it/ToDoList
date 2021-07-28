import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: TodoListComponent },
    { path: 'todo/:id', component: TodoDetailComponent }
  ]
},
{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: '**', redirectTo: '/', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

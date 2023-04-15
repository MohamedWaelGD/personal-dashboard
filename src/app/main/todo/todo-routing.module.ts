import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AddComponent } from './todo/add/add.component';
import { EditComponent } from './todo/edit/edit.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      { 
        path: '',
        component: TodoListComponent    
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'edit/:uuid',
        component: EditComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }

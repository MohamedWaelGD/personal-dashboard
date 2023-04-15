import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { AddComponent } from './todo/add/add.component';
import { EditComponent } from './todo/edit/edit.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TodoComponent,
    AddComponent,
    EditComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }

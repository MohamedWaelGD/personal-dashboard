import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/bookmark';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy{

  todoData!: any;
  getData$!: Subscription;

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData$ = this.todoService.todo$.subscribe(todo => {
      this.todoData = todo;
    })
  }

  sortByCheckedList() {
    var sortedData = [...this.todoData].sort((e1: any, e2: any) => e2.isChecked - e1.isChecked);
    this.todoData = sortedData;
    console.log(this.todoData);
    this.todoService.saveTodo(this.todoData);
  }

  ngOnDestroy(): void {
    this.getData$.unsubscribe();
  }

  toggleCheck(todo: Todo) {
    todo.isChecked = !todo.isChecked;
    this.todoService.editTodo(todo);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoData, event.previousIndex, event.currentIndex);
    this.todoService.saveTodo(this.todoData);
  }

  deleteTodo(uuid: string) {
    this.todoService.deleteTodo(uuid);
    this.toastr.success("Todo item deleted.");
  }
}

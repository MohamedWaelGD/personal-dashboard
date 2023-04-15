import { Injectable } from '@angular/core';
import { Todo } from '../models/bookmark';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private TODO = 'TODO_DATA';

  todo$ = new BehaviorSubject(this.getTodo());

  constructor() {
    window.addEventListener("storage", (event) => {
      this.todo$.next(this.getTodo());
    })
  }

  addTodo(todoData: Todo) {
    var id = uuid.v4();
    todoData.uuid = id;
    todoData.isChecked = false;
    var todo = this.getTodo();
    if (todo) {
      if (Array.isArray(todo)) {
        todo.push(todoData);
      } else {
        todo = [
          todo,
          todoData
        ]
      }
    } else {
      todo = [
        todoData
      ]
    }
    var jsonStr = JSON.stringify(todo);
    localStorage.setItem(this.TODO, jsonStr);
    this.todo$.next(this.getTodo());
  }
  
  editTodo(todoData: Todo) {
    var foundedTodo = this.getTodoByUuid(todoData.uuid);
    if (!foundedTodo) {
      throw console.error('Bookmark not found!');
      
    }

    var todo = this.getTodo();
    if (todo) {
      if (Array.isArray(todo)) {
        var result = todo.find((e: Todo) => e.uuid == todoData.uuid);
        if (result) {
          result.name = todoData.name;
          result.isChecked = todoData.isChecked;
        }
      } else {
        todo = [
          todoData
        ]
      }
    }

    var jsonStr = JSON.stringify(todo);
    localStorage.setItem(this.TODO, jsonStr);
    this.todo$.next(this.getTodo());
  }

  deleteTodo(uuid: string) {
    var foundedTodo = this.getTodoByUuid(uuid);
    if (!foundedTodo) {
      throw console.error('Bookmark not found!');
    }

    var todo = this.getTodo();
    if (todo) {
      if (Array.isArray(todo)) {
        todo = todo.filter((e: any) => e.uuid != uuid)
      }
    }

    var jsonStr = JSON.stringify(todo);
    localStorage.setItem(this.TODO, jsonStr);
    this.todo$.next(this.getTodo());
  }

  saveTodo(todoList: Todo[]) {
    var jsonStr = JSON.stringify(todoList);
    localStorage.setItem(this.TODO, jsonStr);
    this.todo$.next(this.getTodo());
  }

  getTodo() : Todo[] | null {
    var data = localStorage.getItem(this.TODO);
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  getTodoByUuid(uuid: string) : Todo | null {
    var todo = this.getTodo();
    if (todo) {
      var result = todo.find((e: Todo) => e.uuid == uuid);
      return (result) ? result : null; 
    }

    return null;
  }
}


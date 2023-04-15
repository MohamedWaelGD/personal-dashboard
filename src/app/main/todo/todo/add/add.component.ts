import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/bookmark';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  formGroup!: FormGroup;

  get controls() { return this.formGroup.controls }

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
    })
  }

  onAdd() {
    if (this.formGroup.invalid) return;
    var data = this.formGroup.value as Todo;
    this.todoService.addTodo(data);
    this.formGroup.reset();
    this.toastr.success("Todo item created.");
  }
}

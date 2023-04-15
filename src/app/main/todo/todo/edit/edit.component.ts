import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Todo } from '../../models/bookmark';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  formGroup!: FormGroup;

  get controls() { return this.formGroup.controls }

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var uuid = params['uuid'];
      var foundedTodo = this.todoService.getTodoByUuid(uuid);
      if (!foundedTodo)
      {
        this.router.navigate(['/todo']);
        return;
      }
        
      this.formGroup = this.fb.group({
        uuid: new FormControl(foundedTodo!.uuid, [Validators.required]),
        name: new FormControl(foundedTodo!.name, [Validators.required]),
        isChecked: new FormControl(foundedTodo!.isChecked, [Validators.required])
      })
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) return;
    var data = this.formGroup.value as Todo;
    this.todoService.editTodo(data);
    this.toastr.success("Todo item edited.");
  }
}

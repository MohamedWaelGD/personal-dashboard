import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/main/todo/models/bookmark';
import { Note } from '../../models/note';

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
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var uuid = params['uuid'];
      var foundedData = this.noteService.getDataByUuid(uuid);
      if (!foundedData)
      {
        this.router.navigate(['/todo']);
        return;
      }
        
      this.formGroup = this.fb.group({
        uuid: new FormControl(foundedData!.uuid, [Validators.required]),
        title: new FormControl(foundedData!.title, [Validators.required]),
        description: new FormControl(foundedData!.description, [Validators.required])
      })
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) return;
    var data = this.formGroup.value as Note;
    this.noteService.edit(data);
    this.toastr.success("Todo item edited.");
  }
}

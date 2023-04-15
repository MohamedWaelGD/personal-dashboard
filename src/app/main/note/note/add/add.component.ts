import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';

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
    private noteService: NoteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  onAdd() {
    if (this.formGroup.invalid) return;
    var data = this.formGroup.value as Note;
    this.noteService.add(data);
    this.formGroup.reset();
    this.toastr.success("Note item created.");
  }
}

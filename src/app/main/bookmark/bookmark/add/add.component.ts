import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookmarkService } from '../../services/bookmark.service';
import { Bookmark } from '../../models/bookmark';
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
    private bookmarkService: BookmarkService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required])
    })
  }

  onAdd() {
    if (this.formGroup.invalid) return;
    var data = this.formGroup.value as Bookmark;
    this.bookmarkService.addBookmark(data);
    this.formGroup.reset();
    this.toastr.success("Bookmark created.");
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Bookmark } from '../../../models/bookmark';
import { BookmarkService } from '../../../services/bookmark.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() set selectedItem(value: Bookmark) {
    if (value) {
      this.formGroup = this.fb.group({
        uuid: new FormControl(value!.uuid, [Validators.required]),
        name: new FormControl(value!.name, [Validators.required]),
        url: new FormControl(value!.url, [Validators.required])
      })
    } else {
      
      this.formGroup = this.fb.group({
        uuid: new FormControl({value: '', disabled: true}, [Validators.required]),
        name: new FormControl({value: '', disabled: true}, [Validators.required]),
        url: new FormControl({value: '', disabled: true}, [Validators.required])
      })
    }
  }

  formGroup!: FormGroup;
  dataEntered: boolean = false;

  get controls() { return this.formGroup.controls }

  constructor(
    private fb: FormBuilder,
    private bookmarkService: BookmarkService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.formGroup.invalid) return;
    var data = this.formGroup.value as Bookmark;
    this.bookmarkService.editBookmark(data);
    this.toastr.success("Bookmark edited");
  }

  onDelete(uuid: string) {
    this.bookmarkService.deleteBookmark(uuid);
    this.toastr.success("Bookmark deleted");
  }
}
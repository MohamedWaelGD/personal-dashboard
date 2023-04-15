import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/main/todo/models/bookmark';
import { TodoService } from 'src/app/main/todo/services/todo.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy{

  allData!: any;
  getData$!: Subscription;

  constructor(
    private noteService: NoteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData$ = this.noteService.note$.subscribe(allData => {
      this.allData = allData;
    })
  }

  ngOnDestroy(): void {
    this.getData$.unsubscribe();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allData, event.previousIndex, event.currentIndex);
    this.noteService.saveData(this.allData);
  }

  delete(uuid: string) {
    this.noteService.delete(uuid);
    this.toastr.success("Note item deleted.");
  }
}

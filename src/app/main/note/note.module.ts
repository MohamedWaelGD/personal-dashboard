import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { AddComponent } from './note/add/add.component';
import { EditComponent } from './note/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NoteService } from './services/note.service';



@NgModule({
  declarations: [
    NoteComponent,
    NoteListComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    NoteService
  ]
})
export class NoteModule { }

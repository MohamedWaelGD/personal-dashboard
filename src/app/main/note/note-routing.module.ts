import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { AddComponent } from './note/add/add.component';
import { EditComponent } from './note/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: NoteComponent,
    children: [
      { 
        path: '',
        component: NoteListComponent    
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'edit/:uuid',
        component: EditComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }

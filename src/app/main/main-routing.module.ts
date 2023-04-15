import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'bookmark',
        pathMatch: 'full'
      },
      { path: 'bookmark', loadChildren: () => import('./bookmark/bookmark.module').then(m => m.BookmarkModule) },
      { path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },
      { path: 'note', loadChildren: () => import('./note/note.module').then(m => m.NoteModule) }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

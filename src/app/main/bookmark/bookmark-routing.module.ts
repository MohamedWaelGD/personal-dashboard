import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { AddComponent } from './bookmark/add/add.component';
import { ManageComponent } from './bookmark/manage/manage.component';
import { BookmarkListComponent } from './bookmark/bookmark-list/bookmark-list.component';

const routes: Routes = [
  {
    path: '',
    component: BookmarkComponent,
    children: [
      { 
        path: '',
        component: BookmarkListComponent    
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'manage',
        component: ManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarkRoutingModule { }

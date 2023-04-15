import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { AddComponent } from './bookmark/add/add.component';
import { ManageComponent } from './bookmark/manage/manage.component';
import { EditComponent } from './bookmark/manage/edit/edit.component';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import { BookmarkListComponent } from './bookmark/bookmark-list/bookmark-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookmarkService } from './services/bookmark.service';



@NgModule({
  declarations: [
    BookmarkComponent,
    AddComponent,
    ManageComponent,
    EditComponent,
    BookmarkListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BookmarkRoutingModule
  ],
  providers: [
    BookmarkService
  ]
})
export class BookmarkModule { }

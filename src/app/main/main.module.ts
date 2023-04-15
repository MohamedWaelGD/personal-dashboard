import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BookmarkModule } from './bookmark/bookmark.module';
import { TodoModule } from './todo/todo.module';
import { NoteModule } from './note/note.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BookmarkModule,
    TodoModule,
    HttpClientModule,
    NoteModule
  ]
})
export class MainModule { }

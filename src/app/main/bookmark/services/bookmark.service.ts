import { Injectable } from '@angular/core';
import { Bookmark } from '../models/bookmark';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private BOOKMARK = 'BOOKMARK_DATA';

  bookmarks$ = new BehaviorSubject(this.getBookmarks());

  constructor() {
    window.addEventListener("storage", (event) => {
      this.bookmarks$.next(this.getBookmarks());
    })}

  addBookmark(bookmarkData: Bookmark) {
    var id = uuid.v4();
    bookmarkData.uuid = id;
    var bookmarks = this.getBookmarks();
    if (bookmarks) {
      if (Array.isArray(bookmarks)) {
        bookmarks.push(bookmarkData);
      } else {
        bookmarks = [
          bookmarks,
          bookmarkData
        ]
      }
    } else {
      bookmarks = [
        bookmarkData
      ]
    }
    var jsonStr = JSON.stringify(bookmarks);
    localStorage.setItem(this.BOOKMARK, jsonStr);
    this.bookmarks$.next(this.getBookmarks());
  }
  
  editBookmark(bookmarkData: Bookmark) {
    var foundedBookmark = this.getBookmarkByUuid(bookmarkData.uuid);
    if (!foundedBookmark) {
      throw console.error('Bookmark not found!');
      
    }

    var bookmarks = this.getBookmarks();
    if (bookmarks) {
      if (Array.isArray(bookmarks)) {
        var result = bookmarks.find((e: Bookmark) => e.uuid == bookmarkData.uuid);
        if (result) {
          result.name = bookmarkData.name;
          result.url = bookmarkData.url;
        }
      } else {
        bookmarks = [
          bookmarkData
        ]
      }
    }

    var jsonStr = JSON.stringify(bookmarks);
    localStorage.setItem(this.BOOKMARK, jsonStr);
    this.bookmarks$.next(this.getBookmarks());
  }

  deleteBookmark(uuid: string) {
    var foundedBookmark = this.getBookmarkByUuid(uuid);
    if (!foundedBookmark) {
      throw console.error('Bookmark not found!');
    }

    var bookmarks = this.getBookmarks();
    if (bookmarks) {
      if (Array.isArray(bookmarks)) {
        bookmarks = bookmarks.filter((e: any) => e.uuid != uuid)
      }
    }

    var jsonStr = JSON.stringify(bookmarks);
    localStorage.setItem(this.BOOKMARK, jsonStr);
    this.bookmarks$.next(this.getBookmarks());
  }

  getBookmarks() : Bookmark[] | null {
    var data = localStorage.getItem(this.BOOKMARK);
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  getBookmarkByUuid(uuid: string) : Bookmark | null {
    var bookmarks = this.getBookmarks();
    if (bookmarks) {
      var result = bookmarks.find((e: Bookmark) => e.uuid == uuid);
      return (result) ? result : null; 
    }

    return null;
  }
}

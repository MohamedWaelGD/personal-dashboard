import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bookmark } from '../../models/bookmark';
import { BookmarkService } from '../../services/bookmark.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  bookmarks!: Bookmark[] | null;
  selectedBookmark!: any;
  getBookmarks$!: Subscription;

  constructor(
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.getBookmarks$ = this.bookmarkService.bookmarks$.subscribe(bookmarks => {
      this.bookmarks = bookmarks;
      if (this.bookmarks && !this.selectedBookmark) {
        this.selectedBookmark = this.bookmarks[0];
      } else if (this.selectedBookmark) {
        this.selectedBookmark = this.bookmarks!.find((e: any) => e.uuid == this.selectedBookmark.uuid);
        if (!this.selectedBookmark) {
          this.selectedBookmark = this.bookmarks![0];
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.getBookmarks$.unsubscribe();
  }

  selectBookmark(bookmark: any) {
    this.selectedBookmark = bookmark;
  }
}

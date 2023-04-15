import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookmarkService } from '../../services/bookmark.service';
import { Bookmark } from '../../models/bookmark';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit, OnDestroy {

  bookmarksData!: Bookmark[] | null;
  getData$!: Subscription;

  constructor(
    private bookmarkService: BookmarkService
  ) { }

  ngOnInit(): void {
    this.getData$ = this.bookmarkService.bookmarks$.subscribe(bookmarks => {
      this.bookmarksData = bookmarks;
    })
  }

  ngOnDestroy(): void {
    this.getData$.unsubscribe();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}

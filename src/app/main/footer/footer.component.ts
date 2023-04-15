import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  selectedCategory: Categories = Categories.bookmark;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('/note')) {
      this.selectedCategory = Categories.note;
    } else if (this.router.url.includes('/todo')) {
      this.selectedCategory = Categories.todo;
    } else {
      this.selectedCategory = Categories.bookmark;
    }
  }

  selectCategory(categoryNumber: number) {
    this.selectedCategory = categoryNumber;
  }

}

export enum Categories {
  bookmark,
  todo,
  note
}
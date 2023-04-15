import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  private api = "https://api.unsplash.com/photos/random/?client_id=28bwaCrBVz7RecTFaSkqsuI0CYiod2dh9huoYTzhAqM&query=nature&orientation=landscape";
  background!: any;
  isLoading = false;

  constructor (
    private http: HttpClient,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.http.get(this.api).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.background = res.urls.full;
        this.toastr.success("Background loaded.");
      },
      error: (err) => {
        this.isLoading = false;
        this.background = "/assets/imgs/background.jpg";
        this.toastr.error("Error happened.");
      }
    })
  }
  
  refreshBackground() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.http.get(this.api).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.background = res.urls.full;
        this.toastr.success("Background loaded.");
      },
      error: (err) => {
        this.isLoading = false;
        this.background = "/assets/imgs/background.jpg";
        this.toastr.error("Error happened.");
      }
    })
  }
}

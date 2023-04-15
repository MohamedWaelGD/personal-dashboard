import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentTime!: any;
  currentDate!: any;

  constructor() {}

  ngOnInit(): void {
    setInterval(()=>{
      var date = new Date();
      this.getCurrentTime(date);
      this.getCurrentDate(date);
    }, 1000)
  }

  getCurrentTime(date: Date) {
    var minutesValue = date.getMinutes();
    var minutes = minutesValue.toString();
    if (minutesValue < 10)
    {
      minutes = "0" + minutesValue.toString();
    }
    var hoursValue = date.getHours();
    var dayType = (hoursValue > 12 || (hoursValue == 12 && minutesValue > 0)) ? 'PM' : 'AM';
    if (hoursValue > 12) {
      hoursValue -= 12;
    }
    this.currentTime = `${hoursValue}:${minutes} ${dayType}`
  }

  getCurrentDate(date: Date) {
    var days = date.getDate();
    var month = date.toLocaleString('default', { month: 'long'});
    var year = date.getFullYear();
    this.currentDate = `${days} ${month} ${year}`
  }
}

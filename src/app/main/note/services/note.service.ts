import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private NOTE = 'NOTE';

  note$ = new BehaviorSubject(this.getNotes());

  constructor() {
    window.addEventListener("storage", (event) => {
      this.note$.next(this.getNotes());
    })
  }

  add(data: Note) {
    var id = uuid.v4();
    data.uuid = id;
    var allData = this.getNotes();
    if (allData) {
      if (Array.isArray(allData)) {
        allData.push(data);
      } else {
        allData = [
          allData,
          data
        ]
      }
    } else {
      allData = [
        data
      ]
    }
    var jsonStr = JSON.stringify(allData);
    localStorage.setItem(this.NOTE, jsonStr);
    this.note$.next(this.getNotes());
  }
  
  edit(data: Note) {
    var foundedData = this.getDataByUuid(data.uuid);
    if (!foundedData) {
      throw console.error('Data not found!');
      
    }

    var allData = this.getNotes();
    if (allData) {
      if (Array.isArray(allData)) {
        var result = allData.find((e: Note) => e.uuid == data.uuid);
        if (result) {
          result.title = data.title;
          result.description = data.description;
        }
      } else {
        allData = [
          data
        ]
      }
    }

    var jsonStr = JSON.stringify(allData);
    localStorage.setItem(this.NOTE, jsonStr);
    this.note$.next(this.getNotes());
  }

  delete(uuid: string) {
    var foundedData = this.getDataByUuid(uuid);
    if (!foundedData) {
      throw console.error('Data not found!');
    }

    var allData = this.getNotes();
    if (allData) {
      if (Array.isArray(allData)) {
        allData = allData.filter((e: any) => e.uuid != uuid)
      }
    }

    var jsonStr = JSON.stringify(allData);
    localStorage.setItem(this.NOTE, jsonStr);
    this.note$.next(this.getNotes());
  }

  saveData(data: Note[]) {
    var jsonStr = JSON.stringify(data);
    localStorage.setItem(this.NOTE, jsonStr);
    this.note$.next(this.getNotes());
  }

  getNotes() : Note[] | null {
    var data = localStorage.getItem(this.NOTE);
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  getDataByUuid(uuid: string) : Note | null {
    var allData = this.getNotes();
    if (allData) {
      var result = allData.find((e: Note) => e.uuid == uuid);
      return (result) ? result : null; 
    }

    return null;
  }
}


import { Injectable } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  testData: any[] = [];

  constructor() {
    const { year, monthIndex } = this.getCurrent();
    let year1 = year;
    let monthIndex1 = monthIndex - 1;

    let year2 = year;
    let monthIndex2 = monthIndex + 1;

    if (monthIndex === 0) {
      year1 = year - 1;
      monthIndex1 = 11;
    }

    if (monthIndex === 11) {
      year2 = year + 1;
      monthIndex2 = 0;
    }

    this.testData = [

    ]
  }

  getCurrent(): { year: number; monthIndex: number } {
    const currentDate = new Date();

    return {
      year: currentDate.getFullYear(),
      monthIndex: currentDate.getMonth()
    };
  }

  getSchedulesFor(year: number, month: number): Observable<any[]> {
    return of(this.testData).pipe(
      map(arr => arr.filter(
        x => x.date.getFullYear() === year && x.date.getMonth() === month
      ))
    );
  }
  
}



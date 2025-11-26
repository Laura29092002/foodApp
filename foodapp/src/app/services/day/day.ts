import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Day } from '../../models/day/day.model';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  private days: Day[] = [];
  private apiUrl = 'http://localhost:8080/day';
  constructor(private http: HttpClient) {}

  getDays() {
    return this.http.get<Day[]>(this.apiUrl);
  }

  getDayById(id: number) {
    return this.http.get<Day>(`${this.apiUrl}/${id}`);
  }

  addDay(day: Day) {
    return this.http.post<Day>(this.apiUrl, day);
  }

  updateDay(id: number, updatedDay: Day) {
    return this.http.put<Day>(`${this.apiUrl}/${id}`, updatedDay);
  }

  deleteDay(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}

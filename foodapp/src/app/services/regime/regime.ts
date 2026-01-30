import { Injectable } from '@angular/core';
import { Regime } from '../../models/regime/regime.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegimeService {
  private regimes: Regime[] = [];
  private apiUrl = 'http://localhost:8080/regime';

  constructor(private http: HttpClient) {}

  getRegimes() {
    return this.http.get<Regime[]>(this.apiUrl);
  }

  getRegimeById(id: number) {
    return this.http.get<Regime>(`${this.apiUrl}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://127.0.0.1:8000/app/'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  addData(endpoint: string, data: any, token: string): Observable<any> {
    const url = `${this.baseUrl}${endpoint}/`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(url, data, { headers });
  }

  getDpis(token: string): Observable<any> {
    const url = `${this.baseUrl}dpis/`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }

  getDpiById(dpiId: string, token: string): Observable<any> {
    const url = `${this.baseUrl}dpis/${dpiId}/`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }
}

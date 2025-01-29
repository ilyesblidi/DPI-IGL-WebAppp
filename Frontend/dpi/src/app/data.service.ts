import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://127.0.0.1:8000/app'; // Base URL of the backend

  constructor(private http: HttpClient) {}

  // Helper to get headers with Authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // Or use AuthService to get the token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Generic GET request
  getData(endpoint: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, { headers });
  }

  // Generic POST request
  addData(endpoint: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  // Generic DELETE request
  deleteData(endpoint: string, id: string | number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`, { headers });
  }

}

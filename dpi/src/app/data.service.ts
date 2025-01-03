import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:8000'; // Base URL of the backend

  constructor(private http: HttpClient) {}

  // Generic GET request
  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`);
  }

  // Generic POST request
  addData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data);
  }

  // Generic DELETE request
  deleteData(endpoint: string, id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}

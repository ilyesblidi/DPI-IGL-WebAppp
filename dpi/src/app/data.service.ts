import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:8000'; // Base URL of the backend

  constructor(private http: HttpClient) {}

  // Method to generate the headers with the Authorization token
  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  // Method to login and retrieve the token
  login(email: string, password: string): Observable<any> {
    const loginPayload = { email, password };
    return this.http.post<any>(`${this.baseUrl}/app/login/`, loginPayload);
  }

  // Generic GET request with Authorization
  getData(endpoint: string, token: string): Observable<any> {
    const headers = this.createHeaders(token); // Create headers with token
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, { headers });
  }

  // Generic POST request with Authorization
  addData(endpoint: string, data: any, token: string): Observable<any> {
    const headers = this.createHeaders(token); // Create headers with token
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  // Generic DELETE request with Authorization
  deleteData(endpoint: string, id: string | number, token: string): Observable<any> {
    const headers = this.createHeaders(token); // Create headers with token
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`, { headers });
  }

  // Fetch list of DPIs with Authorization token
  getDpis(token: string): Observable<any> {
    return this.getData('app/dpi', token); // Use the generic method for GET request
  }

  // Fetch specific DPI by id with Authorization token
  getDpiById(id: string, token: string): Observable<any> {
    return this.getData(`app/dpi/${id}`, token); // Use the generic method for GET request
  }
}

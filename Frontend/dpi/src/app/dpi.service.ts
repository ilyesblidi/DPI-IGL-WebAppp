import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { DPI } from './dpi.models'; // Import the DPI model from your component

interface Patient {
  NSS: string;
  nom: string;
  prenom: string;
}

interface DPI {
  id_dpi: string;
  date_creation: string;
  commentaire_administratif: string;
  chemin_QR_code: string;
  patient?: Patient;
}

@Injectable({
  providedIn: 'root'
})
export class DpiService {
  private apiUrl = 'https://676bfd0dbc36a202bb865e74.mockapi.io/api/dpi-list/DPI'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all DPIs
  getDpis(): Observable<DPI[]> {
    return this.http.get<DPI[]>(this.apiUrl);
  }

  getDpiById(id: string): Observable<any> {
    return this.http.get<DPI>(`${this.apiUrl}/${id}`);
  }

  // Add a new DPI
  addDpi(dpi: DPI): Observable<DPI> {
    return this.http.post<DPI>(this.apiUrl, dpi);
  }
}

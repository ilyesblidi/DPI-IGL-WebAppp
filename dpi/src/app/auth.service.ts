// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor() {
    // Retrieve the token from localStorage, sessionStorage, or some other method.
    this.token = localStorage.getItem('auth_token');
    }

  // Set the token after login
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);  // Store it for later use
  }

  // Get the token
  getToken(): string | null {
    return this.token;
  }

  // Clear the token (e.g., on logout)
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }
}

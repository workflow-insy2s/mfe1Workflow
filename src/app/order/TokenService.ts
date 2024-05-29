import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getToken(): string | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('token');
  }
  getRole(): string | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('role');
  }
}

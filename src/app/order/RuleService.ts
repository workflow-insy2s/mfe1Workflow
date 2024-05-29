import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  getIdRule(): any | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('IdRule');
  }
  getIdStep(): any | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('IdStep');
  }
  getRankStep(): any | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('RankStep');
  }


  
}

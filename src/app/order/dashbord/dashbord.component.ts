import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
    selector: 'app-dashbord',
    templateUrl: './dashbord.component.html',
    styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  
  doughnutChart: any;
  barChart: any;

  ngOnInit(): void {
    ///count by status 
    this.doughnutChart = new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Terminé', 'En cours', 'En attente'],
        datasets: [{
          data: [30, 40, 30],
          backgroundColor: ['#5271FF', '#66E199', '#EE760F']
        }]
      },
      options: {
        responsive: true
      }
    });

    // Graphique à barres animé
    this.barChart = new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: ['Workflow A', 'Workflow B', 'Workflow C', 'Workflow D'],
        datasets: [{
          label: 'Bar Chart',
          data: [10, 20, 30, 40],
          backgroundColor: '#00CADC', 
          borderColor: 'rgba(75, 192, 192, 1)', 
          borderWidth: 1 
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000, // Durée de l'animation en millisecondes
          easing: 'easeOutQuart' // Fonction d'assouplissement de l'animation
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}

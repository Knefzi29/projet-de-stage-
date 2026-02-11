import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  livres = JSON.parse(localStorage.getItem('livres') || '[]');
  lecteurs = JSON.parse(localStorage.getItem('lecteurs') || '[]');
  emprunts = JSON.parse(localStorage.getItem('emprunts') || '[]');

  get totalLivres() {
    return this.livres.length;
  }

  get livresDisponibles() {
    return this.livres.filter((l: any) => l.disponible).length;
  }

  get totalLecteurs() {
    return this.lecteurs.length;
  }

  get totalEmprunts() {
    return this.emprunts.length;
  }

}

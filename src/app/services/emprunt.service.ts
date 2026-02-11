import { Injectable } from '@angular/core';
import { Emprunt } from '../models/emprunt.model';
import { LivreService } from './livre.service';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  private key = 'emprunts';
  private emprunts: Emprunt[] = [];

  constructor(private livreService: LivreService) {
    this.emprunts = JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getAll(): Emprunt[] {
    return this.emprunts;
  }

  // ajouter un emprunt
  emprunter(emprunt: Emprunt): void {
    emprunt.id = Date.now();
    emprunt.dateEmprunt = new Date().toISOString();

    // Date limite 
    const limite = new Date();
    limite.setDate(limite.getDate() + 1);
    emprunt.dateLimite = limite.toISOString();

    emprunt.dateRetour = null;

    this.emprunts.push(emprunt);
    this.livreService.setDisponible(emprunt.livreId, false);

    this.save();
  }


  retourne(id: number): void {
    const em = this.emprunts.find(e => e.id === id);

    if (em && !em.dateRetour) {
      em.dateRetour = new Date().toISOString();
      this.livreService.setDisponible(em.livreId, true);
      this.save();
    }
  }

  supprimer(id: number): void {
  const index = this.emprunts.findIndex(e => e.id === id);

  if (index !== -1) {
    const emprunt = this.emprunts[index];

    // rendre le livre disponible si non retourné
    if (!emprunt.dateRetour) {
      this.livreService.setDisponible(emprunt.livreId, true);
    }

    this.emprunts.splice(index, 1);
    this.save();
  }
}

// enregistrié les information
  private save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.emprunts));
  }

}

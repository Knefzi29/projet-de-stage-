import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../services/emprunt.service';
import { LivreService } from '../services/livre.service';
import { LecteurService } from '../services/lecteur.service';
import { Emprunt } from '../models/emprunt.model';
import { Livre } from '../models/livre.model';
import { Lecteur } from '../models/lecteur.model';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.css']
})
export class EmpruntComponent implements OnInit {

  emprunts: Emprunt[] = [];
  livres: Livre[] = [];
  lecteurs: Lecteur[] = [];

  newEmprunt: Emprunt = {
    id: 0,
    livreId: 0,
    lecteurId: 0,
    dateEmprunt: '',
    dateLimite: '',
    dateRetour: null
  };

  constructor(
    private empruntService: EmpruntService,
    private livreService: LivreService,
    private lecteurService: LecteurService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Charger toutes les données
  loadData(): void {
    this.emprunts = this.empruntService.getAll();
    this.livres = this.livreService.getAll();
    this.lecteurs = this.lecteurService.getAll();
  }

  // Récupérer livre
  getLivre(id: number): Livre | undefined {
    return this.livres.find(l => l.id === id);
  }

  // Récupérer lecteur
  getLecteur(id: number): Lecteur | undefined {
    return this.lecteurs.find(l => l.id === id);
  }
  ajouter(): void {
  if (!this.newEmprunt.livreId || !this.newEmprunt.lecteurId) {
    alert('Veuillez choisir un livre et un lecteur');
    return;
  }

  this.empruntService.emprunter({ ...this.newEmprunt });
  this.loadData();

  this.newEmprunt.livreId = 0;
  this.newEmprunt.lecteurId = 0;
}

retourner(id: number): void {
  this.empruntService.retourne(id);
  this.loadData();
}

isRetourne(e: Emprunt): boolean {
  return e.dateRetour !== null;
}

isExpire(e: Emprunt): boolean {
  if (e.dateRetour) return false;
  return new Date(e.dateLimite) < new Date();
}
supprimer(id: number): void {
  if (confirm('Supprimer cet emprunt ?')) {
    this.empruntService.supprimer(id);
    this.loadData();
  }
}

}

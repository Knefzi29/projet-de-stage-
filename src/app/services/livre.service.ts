import { Injectable } from '@angular/core';
import { Livre } from '../models/livre.model';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private key='livres';
  livres:Livre[]=JSON.parse(localStorage.getItem(this.key)||'[]')
  getAll(){
    return this.livres
  }
  // ajouter un livre 
  add(livre:Livre){
    this.livres.push(livre);
    this.save();
  }
  //supprison un livre
  delete(id:number){
    this.livres=this.livres.filter(l=>l.id!==id);
    this.save();
  }
  // changé l'etat de la disponibilité
  setDisponible(id:number , value: boolean){
    const livre=this.livres.find(l=>l.id===id);
    if(livre){
      livre.disponible=value;
      this.save();
    }

  }
  // save les echangment des l'information
  private save(){
    localStorage.setItem(this.key,JSON.stringify(this.livres))
  }

  constructor() { }
}

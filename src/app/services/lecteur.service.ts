import { Injectable } from '@angular/core';
import { Lecteur } from '../models/lecteur.model';

@Injectable({
  providedIn: 'root'
})
export class LecteurService {
  private key='lecteurs';
  lecteurs:Lecteur[]=JSON.parse(localStorage.getItem(this.key)||'[]');
  getAll(){
    return this.lecteurs
  }
 
  add(lecteur:Lecteur){
    this.lecteurs.push(lecteur);
    this.save();
  }
  delete(id:number){
    this.lecteurs=this.lecteurs.filter(l=>l.id!=l.id);
    this.save();
  }
  private save(){
    localStorage.setItem(this.key,JSON.stringify(this.lecteurs));
  }

  constructor() { }
}

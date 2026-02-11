import { Component } from '@angular/core';
import { Livre } from '../models/livre.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent {
  livres:Livre[]=[];
   livresFiltres: Livre[] = [];
  search: string = '';
  newLivre:Livre={
    id:0,titre:'',auteur:'',categorie:'',disponible:true,image: ''
  }
  show = false;
  constructor(private service:LivreService){
    this.livres=this.service.getAll();
  }
  add():void{
    if(this.newLivre.titre==""){
      alert("le champ titre est obligatoire");
      return;
    }
    if(this.newLivre.auteur==""){
      alert("le champ auteur est obligatoire");
      return;
    }
    if(this.newLivre.categorie==""){
      alert("le champ categorie est obligatoire");
      return;

    }
    this.newLivre.id=Date.now();
    // ithaken image vide mafamech
    if (!this.newLivre.image) {
    this.newLivre.image = 'https://via.placeholder.com/150x220?text=Livre';
  }
    this.service.add(this.newLivre);
    this.livres=this.service.getAll();
    this.filtrer();
    this.newLivre={id:0,titre:'',auteur:'',categorie:'',disponible:true, image: ''};
    
  }
  delete(id:number){
    this.service.delete(id);
    this.livres=this.service.getAll();
    this.filtrer();
    this.show = false;

  }
    filtrer() {
    const term = this.search.toLowerCase();
    this.livresFiltres = this.livres.filter(l =>
      l.titre.toLowerCase().includes(term) ||
      l.auteur.toLowerCase().includes(term) ||
      l.categorie.toLowerCase().includes(term)
    );
  }
}

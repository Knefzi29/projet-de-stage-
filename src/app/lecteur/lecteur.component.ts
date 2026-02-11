import { Component } from '@angular/core';
import { Lecteur } from '../models/lecteur.model';
import { LecteurService } from '../services/lecteur.service';

@Component({
  selector: 'app-lecteur',
  templateUrl: './lecteur.component.html',
  styleUrls: ['./lecteur.component.css']
})
export class LecteurComponent {
  lecteurs:Lecteur[]=[];
  newLecteur={
    id:0,nom:'',email:'',phone:''
  };
  search: string = '';
  show= false;
  constructor(private service:LecteurService){
    this.lecteurs=this.service.getAll()
  }
  add():void{
    if(this.newLecteur.nom==""){
      alert("le champ de nom obligatoire");
      return;
    }
    if(this.newLecteur.email==""){
      alert("le champ de email obligatoire");
      return;
    }
    if(this.newLecteur.phone==""){
      alert("le champ de phone obligatoire");
      return;
    }
    this.newLecteur.id=Date.now();
    this.service.add(this.newLecteur);
    this.lecteurs=this.service.getAll();
    this.newLecteur={
    id:0,nom:'',email:'',phone:''
  };


  }
  del(id:number){
    this.service.delete(id);
    this.lecteurs=this.service.getAll();
  }


}

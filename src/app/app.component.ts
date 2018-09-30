import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotesService } from '../services/notes.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'pwa';
  panelOpenState = false;
  categorias:any=['Trabajo','Perosnal'];
  nota:any={};
  notas:any=[];

  constructor(private swUpdate:SwUpdate, private noteServices: NotesService, public snackBar: MatSnackBar){
    this.noteServices.getNotes().valueChanges().subscribe((fbNotas)=>{
      this.notas=fbNotas;
      console.log(this.notas);
    })
  }

  ngOnInit(): void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        window.location.reload();
      })
    }
  }
  guardarNota():void{
    if(!this.nota.id){
      this.nota.id=Date.now();
    }
    console.log(this.nota);
    this.noteServices.createNote(this.nota).then(()=>{
      this.nota={};
      this.snackBar.open('Nota creada', null, {
        duration: 2000,
      });
    });
  } 

  SeleccionarNota(nota):void{
    console.log(nota);
    this.nota=nota;
  }
}

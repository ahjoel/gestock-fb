import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
// import * as $ from 'jquery';
// import 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from '../service/categorie.service';
import { DatePipe } from '@angular/common';
import { SearchPipe } from '../pipe/search.pipe';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
  providers: [SearchPipe]
})

export class CategorieComponent {

  categorieForm: FormGroup|any;
  data:any;
  isedit:boolean=false;
  searchText: string;
  libelle:any;
  libelleShow:any;
  today:any;
  sortProperty: string = 'id';
  sortOrder = 1;

  constructor(
    private _categorieService:CategorieService,
    private _toast:ToastrService,
    public datepipe: DatePipe,
    private searchPipe: SearchPipe
  ){
    this.searchText = '';
  }

  // Initialisation
  ngOnInit(): void {
    this.categorieForm = new FormGroup({
       'code': new FormControl(),
       'libelle': new FormControl()
      //  'date_creation': new FormControl({value:this.currentdate, disabled:false})
    })
    this.getData();
    
  }

  // Recherche avec sur le libellé de la catégorie
  filteredItems(): any[] {
    return this.searchPipe.transform(this.data, this.searchText);
  }

  // Tri par colonne
  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.data = [...this.data.sort((a: any, b: any) => {
        // sort comparison function
        let result = 0;
        if (a[property] < b[property]) {
            result = -1;
        }
        if (a[property] > b[property]) {
            result = 1;
        }
        return result * this.sortOrder;
    })];
  }

  // Affichage de l'icone selon le tri
  sortIcon(property: string) {
    if (property === this.sortProperty) {
        return this.sortOrder === 1 ? '🔼' : '🔽';
    }
    return '';
  }

  // Affichage des données dans la table Categorie
  getData(){
    this._categorieService.getData().subscribe(res=>{
      this.data = res;
      // console.log(this.data);
    },(error) => {
      console.log(error);
    })
  }

  // Modification d'une donnée
  update(categorie:any){
    this.categorieForm.id = categorie.id;
    this.libelleShow = this.categorieForm.value.libelle;
    this._categorieService.update(this.categorieForm.id, this.categorieForm.value).subscribe(res=>{
      this.showInfo();
      this.getData();
      // this.categorieForm.reset()
    },(error) => {
      console.log(error);
    })
  }

  // Enregistrement d'une donnée
  sendata(categorieForm:FormGroup){
    // console.log(this.categorieForm.value);
    this.data.push(this.categorieForm.value);
    this.libelle = this.categorieForm.value.libelle;
    this._categorieService.postdata(this.categorieForm.value).subscribe(res=>{
      this.showSuccess();
      this.getData();
      // this.categorieForm.reset()
    },(error) => {
      console.log(error);
    })
  }

  submit(){

  }

  // Changement de mode
  addmodel(){
    this.isedit=false;
    this.categorieForm.reset();
  }

  // Chargement des éléments du formulaire pour la modification
  edit(i:any, categorie:any){
    this.isedit=true;
    this.categorieForm.id = categorie.id;
    this.categorieForm.setValue({
      code: categorie.code,
      libelle: categorie.libelle,
      // date_creation: this.currentdate
    })
  }

  // Suppression d'une donnée
  delete(index:number, categorie:any){
    this.categorieForm.id = categorie.id;
    if(confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      this._categorieService.delete(this.categorieForm.id, categorie).subscribe(res=>{
        this.data.splice(index, 1);
        this.showError();
        // this.categorieForm.reset()
      },(error) => {
        console.log(error);
      })
    }
  }

  public showSuccess():void {
    this._toast.success('Catégorie crée avec succès', this.libelle);
  }
  
  public showInfo():void {
    this._toast.info('Catégorie modifiée avec succès', this.libelleShow);
  }
  
  public showError():void {
    this._toast.error('Catégorie supprimé');
  }
}

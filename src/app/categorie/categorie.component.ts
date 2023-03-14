import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
// import * as $ from 'jquery';
// import 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from '../service/categorie.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})

export class CategorieComponent {
  // Initialisation de datatable
  // ngAfterViewInit(): void {
  //   $('#dataTable').DataTable();
  // }

  categorieForm: FormGroup|any;
  data:any;
  isedit:boolean=false;
  libelle:any;
  libelleShow:any;
  today:any;

  constructor(
    private _categorieService:CategorieService,
    private _toast:ToastrService,
    public datepipe: DatePipe
  ){}

  ngOnInit(): void {
    this.categorieForm = new FormGroup({
       'code': new FormControl(),
       'libelle': new FormControl()
      //  'date_creation': new FormControl({value:this.currentdate, disabled:false})
    })
    this.getData();
  }

  getData(){
    this._categorieService.getData().subscribe(res=>{
      this.data = res;
      // console.log(this.data);
    })
  }

  update(categorie:any){
    this.categorieForm.id = categorie.id;
    this.libelleShow = this.categorieForm.value.libelle;
    this._categorieService.update(this.categorieForm.id, this.categorieForm.value).subscribe(res=>{
      this.showInfo();
      this.getData();
      // this.categorieForm.reset()
    })
  }

  sendata(categorieForm:FormGroup){
    // console.log(this.categorieForm.value);
    this.data.push(this.categorieForm.value);
    this.libelle = this.categorieForm.value.libelle;
    this._categorieService.postdata(this.categorieForm.value).subscribe(res=>{
      this.showSuccess();
      this.getData();
      // this.categorieForm.reset()
    })
  }

  submit(){

  }

  addmodel(){
    this.isedit=false;
    this.categorieForm.reset();
  }

  currentdate:any = this.datepipe.transform((new Date), 'dd-MM-yyyy');
  
  edit(i:any, categorie:any){
    this.isedit=true;
    this.categorieForm.id = categorie.id;
    this.categorieForm.setValue({
      code: categorie.code,
      libelle: categorie.libelle,
      // date_creation: this.currentdate
    })
  }

  delete(index:number, categorie:any){
    this.categorieForm.id = categorie.id;
    this._categorieService.delete(this.categorieForm.id, categorie).subscribe(res=>{
      this.data.splice(index, 1);
      this.showError();
      // this.categorieForm.reset()
    })
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

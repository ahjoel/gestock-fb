import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../pipe/search.pipe';
import { FournitureService } from '../service/fourniture.service';

interface Order {
  id: number;
  customer_id: number;
  order_date: string;
  total_amount: number;
  customer: Customer;
}

interface Customer {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-fourniture',
  templateUrl: './fourniture.component.html',
  styleUrls: ['./fourniture.component.css'],
  providers: [SearchPipe]
})
export class FournitureComponent {

  fournitureForm: FormGroup|any;
  data:any;
  categories:any;
  isedit:boolean=false;
  libelle:any;
  orders:any;
  libelleShow:any;
  selectedValue: any;
  transformedData: any;
  item: any;
  searchText: string;
  sortProperty: string = 'id';
  sortOrder = 1;

  constructor(
    private _fournitureService:FournitureService,
    private _toast:ToastrService,
    private searchPipe: SearchPipe
  ){
    this.searchText = '';
  }

  ngOnInit(): void {
    this.fournitureForm = new FormGroup({
       'code': new FormControl(),
       'libelle': new FormControl(),
       'category_id': new FormControl(),
       'base': new FormControl(),
       'seuil': new FormControl(),
    })
    this.getData();
    this.getDataCategories();
    // this.getOrdersCustomers();
    // 
   
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

  // Recherche avec sur le libellé de la catégorie
  filteredItems(): any[] {
    return this.searchPipe.transform(this.data, this.searchText);
  }

  // Use join to perform show data with fourniture and categorie
  getData(){
    this._fournitureService.getFournitures().subscribe(fournitures=>{
      this._fournitureService.getCategories().subscribe(categories=>{
        this.data = fournitures.map((fourniture: { category_id: any; }) =>{
          const categorie = categories.find((cat: { id: any; }) => cat.id === fourniture.category_id);
          return {
            ...fourniture,
            categorie
          }
        })
        // console.log(this.data);
      })
    })
  }

  // // Test List des commandes avec clients
  // getOrdersCustomers(){
  //   this._fournitureService.getOrders().subscribe(orders=>{
  //     this._fournitureService.getCustomers().subscribe(customers=>{
  //       this.orders = orders.map((order: { customer_id: any; }) =>{
  //         const customer = customers.find((cust: { id: any; }) => cust.id === order.customer_id);
  //         return {
  //           ...order,
  //           customer
  //         }
  //       })
  //       // console.log(this.orders);
  //     })
  //   })
  // }

  

  getDataCategories(){
    this._fournitureService.getDataListCategories().subscribe(res=>{
      this.categories = res;
    })
  }
  
  
  sendata(fournitureForm:FormGroup){
    // console.log('Avant', this.fournitureForm.value);
    const data_convert = this.fournitureForm.value;
    data_convert.category_id = parseInt(data_convert.category_id, 10);
    // console.log('Après', data_convert);

    this.data.push(data_convert);
    this.libelle = this.fournitureForm.value.libelle;
    this._fournitureService.postdata(data_convert).subscribe(res=>{
      this.showSuccess();
      this.getData();
    })
  }

  submit(){
    
  }

  update(fourniture:any){
    this.fournitureForm.id = fourniture.id;
    const data_convert = this.fournitureForm.value;
    data_convert.category_id = parseInt(data_convert.category_id, 10);
    this.libelleShow = data_convert.libelle;
    // console.log(this.fournitureForm.id)
    // console.log(data_convert.libelle)
    this._fournitureService.update(this.fournitureForm.id, data_convert).subscribe(res=>{
      this.showInfo();
      this.getData();
    })
  }

  edit(i:any, fourniture:any){
    this.isedit=true;
    this.fournitureForm.id = fourniture.id;
    this.fournitureForm.setValue({
      code: fourniture.code,
      libelle: fourniture.libelle,
      category_id: fourniture.category_id,
      base: fourniture.base,
      seuil: fourniture.seuil,
    })
  }

  delete(index:number, fourniture:any){
    this.fournitureForm.id = fourniture.id;
    this._fournitureService.delete(this.fournitureForm.id, fourniture).subscribe(res=>{
      this.data.splice(index, 1);
      this.showError();
    })
  }

  addmodel(){
    this.isedit=false;
    this.fournitureForm.reset();
  }
  
  public showSuccess():void {
    this._toast.success('Fourniture crée avec succès', this.libelle);
  }
  
  public showInfo():void {
    this._toast.info('Fourniture modifiée avec succès', this.libelleShow);
  }
  
  public showError():void {
    this._toast.error('Fourniture supprimé');
  }
}

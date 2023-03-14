import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FournitureService {

  apiurl = "http://localhost:3000/fournitures";

  apiurl_categories = "http://localhost:3000/categories";

  constructor(private _Http: HttpClient) { }

  getData(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  getFournitures(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  getCategories(): Observable<any> {
    return this._Http.get(this.apiurl_categories);
  }

  getOrders(): Observable<any> {
    return this._Http.get('http://localhost:3000/orders');
  }

  getCustomers(): Observable<any> {
    return this._Http.get('http://localhost:3000/customers')
  }

  getDataListCategories(): Observable<any> {
    return this._Http.get(this.apiurl_categories);
  }

  postdata(fourniture:any){
    return this._Http.post(this.apiurl, fourniture)
  }

  update(id:any, fourniture:any){
    return this._Http.put(`${this.apiurl}/${id}`, fourniture)
  }

  delete(id:any, fourniture:any){
    return this._Http.delete(`${this.apiurl}/${id}`, fourniture)
  }

}

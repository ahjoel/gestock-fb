import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournitureService {

  apiurl = "http://localhost:3000/fournitures";

  apiurl_categories = "http://localhost:3000/categories";

  constructor(private _Http: HttpClient) { }

  // Recuperation de fournitures
  getData(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  // Recuperation de fournitures
  getFournitures(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  // Recuperation de categories
  getCategories(): Observable<any> {
    return this._Http.get(this.apiurl_categories);
  }

  // Recuperation de categories
  getDataListCategories(): Observable<any> {
    return this._Http.get(this.apiurl_categories);
  }

  // Enregistrement de fournitures
  postdata(fourniture:any){
    return this._Http.post(this.apiurl, fourniture)
  }

  // Modification de fournitures
  update(id:any, fourniture:any){
    return this._Http.put(`${this.apiurl}/${id}`, fourniture)
  }

  // Suppression de fournitures
  delete(id:any, fourniture:any){
    return this._Http.delete(`${this.apiurl}/${id}`, fourniture)
  }

}

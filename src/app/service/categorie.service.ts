import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  apiurl = "http://localhost:3000/categories";

  constructor(private _Http: HttpClient) { }

  getData(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  postdata(categorie:any){
    return this._Http.post(this.apiurl, categorie)
  }

  update(id:any, categorie:any){
    return this._Http.put(`${this.apiurl}/${id}`, categorie)
  }

  delete(id:any, categorie:any){
    return this._Http.delete(`${this.apiurl}/${id}`, categorie)
  }
}

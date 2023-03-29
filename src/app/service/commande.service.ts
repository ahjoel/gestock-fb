import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  apiurl = "http://localhost:3000/commandes";
  apiurl_ligne_commande = "http://localhost:3000/lignes_commandes";

  constructor(private _Http: HttpClient) { }

  getData(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  postdata(commande:any){
    return this._Http.post(this.apiurl, commande);
  }

  postdatalignecommande(lcommande:any){
    return this._Http.post(this.apiurl_ligne_commande, lcommande);
  }
}

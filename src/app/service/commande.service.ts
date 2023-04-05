import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  apiurl = "http://localhost:3000/commandes";
  apiurl_ligne_commande = "http://localhost:3000/lignes_commandes";
  apiurl_fourniture = "http://localhost:3000/fournitures";

  constructor(private _Http: HttpClient) { }

  // Recuperation de commande
  getData(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  // Recuperation de la liste de commande
  getDataListCommande(): Observable<any> {
    return this._Http.get(this.apiurl);
  }

  // Recuperation de la liste de fourniture
  getDataListFourniture(): Observable<any> {
    return this._Http.get(this.apiurl_fourniture);
  }

  // Recuperation de la liste de commande de fourniture
  getDataListLigneCommandeFourniture(): Observable<any> {
    return this._Http.get(this.apiurl_ligne_commande);
  }

  // Enregistrement de commande
  postdata(commande:any){
    return this._Http.post(this.apiurl, commande);
  }

  // Enregistrement de ligne de commande de fourniture
  postdatalignecommande(lcommande:any){
    return this._Http.post(this.apiurl_ligne_commande, lcommande);
  }

  // Selection de la liste des fournitures en fonction de la ligne de commande
  getFournituresByLigneCommandeId(id: string | number): Observable<any> {
    return this._Http.get<any>(`${this.apiurl_ligne_commande}?id=${id}`);
  }

  // Modification de commande avec la ligne commande
  update(id:any, commande:any){
    return this._Http.put(`${this.apiurl_ligne_commande}/${id}`, commande)
  }

  // Suppression de la ligne de commande
  delete(id:any, commande:any){
    return this._Http.delete(`${this.apiurl_ligne_commande}/${id}`, commande)
  }
}

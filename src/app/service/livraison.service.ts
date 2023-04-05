import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  apiurl_commande = "http://localhost:3000/commandes";
  apiurl_ligne_commande = "http://localhost:3000/lignes_commandes";
  apiurl_fourniture = "http://localhost:3000/fournitures";
  apiurl_livraison = "http://localhost:3000/livraisons";
  apiurl_ligne_livraison = "http://localhost:3000/lignes_livraisons";
  apiurl_ligne_mouvement = "http://localhost:3000/lignes_mouvements";

  constructor(private _Http: HttpClient) { }

  // Recuperation de livraison
  getData(): Observable<any> {
    return this._Http.get(this.apiurl_livraison);
  }

  // Recuperation de la liste de commande
  getDataListCommande(): Observable<any> {
    return this._Http.get(this.apiurl_ligne_commande);
  }

  // Recuperation de la liste de fourniture
  getDataListFourniture(): Observable<any> {
    return this._Http.get(this.apiurl_fourniture);
  }

  // Recuperation de la liste de ligne des livraisons de fourniture
  getDataListLigneLivraisonFourniture(): Observable<any> {
    return this._Http.get(this.apiurl_ligne_livraison);
  }

  // Enregistrement de livraison
  postdata(livraison:any){
    return this._Http.post(this.apiurl_livraison, livraison);
  }

  // Enregistrement de ligne de livraison de fourniture
  postdatalignelivraison(llivraison:any){
    return this._Http.post(this.apiurl_ligne_livraison, llivraison);
  }

  // Enregistrement des lignes de livraison dans la table mouvement pour l'historique
  postdatalignelivraison_mouvement(mouvement:any){
    return this._Http.post(this.apiurl_ligne_mouvement, mouvement);
  }

  // Modification de livraison avec la ligne livraison
  update(id:any, livraison:any){
    return this._Http.put(`${this.apiurl_ligne_livraison}/${id}`, livraison)
  }

  // Suppression de la ligne de commande
  delete(id:any, commande:any){
    return this._Http.delete(`${this.apiurl_ligne_livraison}/${id}`, commande)
  }
}

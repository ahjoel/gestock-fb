import { Component } from '@angular/core';
import { CommandeService } from '../service/commande.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {

  commandeForm:FormGroup|any;
  fournitures:any;
  commandes:any;
  data:any;

  constructor(
    private _commandeService: CommandeService,
    private _toast:ToastrService,
  ){}

  ngOnInit(){
    this.commandeForm = new FormGroup({
      'CommandeId': new FormControl(),
      'FounitureId': new FormControl(),
      'Qte': new FormControl(),
   })
    this.getData();
    this.getDataListeFourniture();
    this.getDataListeCommande();
  }

  // Affichage de la liste des commandes de fournitures - double jointure
  getData(){
    this._commandeService.getDataListLigneCommandeFourniture().subscribe(ligne_commandes=>{
      this._commandeService.getDataListCommande().subscribe(commandes=>{
        this._commandeService.getDataListFourniture().subscribe(fournitures=>{
          this.data = ligne_commandes.map((ligne_commande: { CommandeId: any; FounitureId:any }) =>{
            const commande = commandes.find((com: { id: any; }) => com.id === ligne_commande.CommandeId);
            const fourniture = fournitures.find((fourt: { id: any; }) => fourt.id === ligne_commande.FounitureId);
            return {
              ...ligne_commande,
              commande,
              fourniture
            }
          })
          // console.log('Data', this.data);
        },(error) => {
          console.log(error);
        })
      },(error) => {
        console.log(error);
      })
    },(error) => {
      console.log(error);
    })
  }

  // Liste des fournitures
  getDataListeFourniture(){
    this._commandeService.getDataListFourniture().subscribe(res=>{
      this.fournitures = res;
    },(error) => {
      console.log(error);
    })
  }
  
  // Liste des commandes
  getDataListeCommande(){
    this._commandeService.getDataListCommande().subscribe(res=>{
      this.commandes = res;
    },(error) => {
      console.log(error);
    })
  }

  // Chargement des éléments du formulaire
  edit(i:any, lcommande:any){
    // console.log('Data', lcommande.id);
    this.commandeForm.id = lcommande.id;
    this.commandeForm.setValue({
      CommandeId: lcommande.CommandeId,
      FounitureId: lcommande.FounitureId,
      Qte: lcommande.Qte,
    })
  }

  // Modification de la commande
  update(lcommande:any){
    this.commandeForm.id = lcommande.id;
    const data_convert = this.commandeForm.value;
    data_convert.CommandeId = parseInt(data_convert.CommandeId, 10);
    data_convert.FounitureId = parseInt(data_convert.FounitureId, 10);
    // this.libelleShow = data_convert.commande;
    // console.log(this.fournitureForm.id)
    // console.log(data_convert.libelle)
    this._commandeService.update(this.commandeForm.id, data_convert).subscribe(res=>{
      this.showInfo();
      this.getData();
    },
    (error) => {
      console.log(error);
    })
  }

  // Suppression de la commande
  delete(index:number, lcommande:any){
    this.commandeForm.id = lcommande.id;
    if(confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) { 
      this._commandeService.delete(this.commandeForm.id, lcommande).subscribe(res=>{
        this.data.splice(index, 1);
        this.showError();
      },
      (error) => {
        console.log(error);
      })
    }
  }

  public showInfo():void {
    this._toast.info('Commande modifiée avec succès', 'Commande');
  }
  
  public showError():void {
    this._toast.error('Commande supprimée');
  }

}

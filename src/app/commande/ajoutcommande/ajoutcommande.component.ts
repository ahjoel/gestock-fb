import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommandeService } from 'src/app/service/commande.service';
import { FournitureService } from 'src/app/service/fourniture.service';

@Component({
  selector: 'app-ajoutcommande',
  templateUrl: './ajoutcommande.component.html',
  styleUrls: ['./ajoutcommande.component.css']
})
export class AjoutcommandeComponent implements OnInit{
  ligneCommandeObjet: LigneCommandeObjet;
  ligneCommandeTab: LigneCommandeObjet[] = [];
  isedit:boolean=false;
  data:any;
  fournitures:any;
  codeCommande:string;
  dateCommande:Date|string;
  commandeId:any;
  
  constructor(
    private _fournitureService:FournitureService,
    private _commandeService:CommandeService,
    private _toast:ToastrService
  ){
    this.ligneCommandeObjet = new LigneCommandeObjet();
    this.codeCommande = '';
    this.dateCommande = '';
  }

  ngOnInit():void {
    this.isedit = false;
    // Initialisation du tableau des lignes de commandes(jointure)
    this.getLigneCommande();
    // Initialisation du select des fournitures
    this.getDataFournitures();
    // Initialisation d'un nouveau code pour la commande
    this.getNewCodeCommande();
    // this.fournitures = this.getDataFournitures();
  }

  // Code Commande
  getNewCodeCommande() {
    this._commandeService.getData().subscribe(res=>{
      // Recuperation de la date actuelle, comptage des commandes existantes avec incrementation pour une nouvelle
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2,'0');
      const month = (currentDate.getMonth() +1).toString().padStart(2,'0');
      const year = currentDate.getFullYear().toString();
      const date_code = `CMD${day}${month}${year}`;
      this.codeCommande = date_code + (res.length + 1);
    })
  }

  // Save Commande to json
  onSubmit() {
    const isData = localStorage.getItem('LigneCommande');
    // Cheick if any data in localstorage exist
    if (isData !== null) {
      const commande = {codeCommande:this.codeCommande, dateCommande:this.dateCommande}
      // console.log(`Data : ${this.codeCommande} et ${this.dateCommande}`);
      this.codeCommande = this.codeCommande;
      this._commandeService.postdata(commande).subscribe((res:any) => {
        this.commandeId = res.id;
        // console.log('Commande Id', this.commandeId);
        const localData = JSON.parse(isData);

        // For loop to save all ligne commandes
        for (let index = 0; index < localData.length; index++) {
          // console.log(`Record ${index} : ${localData[index].FounitureId} ${localData[index].Qte} CommandeId : ${this.commandeId}`);
          const ligneCommandeFourniture = {CommandeId: this.commandeId, FounitureId:localData[index].FounitureId, Qte:localData[index].Qte}
          this._commandeService.postdatalignecommande(ligneCommandeFourniture).subscribe(st=>{
          })
        }

        // Show Success info
        this.showSuccess();
        // Destroy localstorage
        localStorage.removeItem('LigneCommande');
        this.data.splice(0, this.data.length);
        
        // Reset Commande form and create new code for order
        this.getNewCodeCommande();
        // Reset date commande input
        this.dateCommande = '';
      })

    }else{
      alert('Veuillez insérer au moins une ligne de commande de fourniture.');
    }
  }

  // Read Data
  getLigneCommande() {
    const isData = localStorage.getItem('LigneCommande');
    // Cheick data from localstorage for LigneCommande
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.ligneCommandeTab = localData;
    }
    // Cheick fourniture data from json server
    this._fournitureService.getData().subscribe(res=>{
      this.fournitures = res;

      // Use join between ligneCommandeTab and fourniture to perform data show on table
      this.data = this.ligneCommandeTab?.map((ligneCommande: { FounitureId: any; }) =>{
        const fourniture = this.fournitures?.find((fourniture: { id: any; }) => fourniture.id === ligneCommande.FounitureId);
        return {
          ...ligneCommande,
          fourniture
        }
      })
    })
    // const fournits = this.getDataFournitures();
  }
  
  // Get data for fournitures
  getDataFournitures(){
    this._fournitureService.getFournitures().subscribe(res=>{
      this.fournitures = res;
      // console.log('Data', this.fournitures);
    })
  }

  // Create Data - LigneCommande - Front
  onSave() {
    const isData = localStorage.getItem('LigneCommande');
    if (isData == null) {
      // First Record with set first ID
      const newArr = [];
      this.ligneCommandeObjet.LigneCommandeId = 1;
      // Convert FournitureId select value string to integer to perform join
      this.ligneCommandeObjet.FounitureId = parseInt(this.ligneCommandeObjet.FounitureId.toString(), 10);
      newArr.push(this.ligneCommandeObjet);
      // Save in localstorage
      localStorage.setItem('LigneCommande', JSON.stringify(newArr));
    } else {
      // Second Record with increment ID
      const oldData = JSON.parse(isData);

      // Convert FournitureID select value string to integer to perform control duplicate data
      this.ligneCommandeObjet.FounitureId = parseInt(this.ligneCommandeObjet.FounitureId.toString(), 10);
      const datafind = oldData?.find((e: { FounitureId: any; }) => e.FounitureId === this.ligneCommandeObjet.FounitureId);

      // Cheick to eliminate double record with FournitureId
      if (datafind == null){
        // Cheick to avoid record with null data
        if (this.ligneCommandeObjet.FounitureId === 0 || this.ligneCommandeObjet.Qte === 0) {
          alert('Veuillez remplir correctement les champs!');
        } else {
  
          // Get MaxID
          const maxId = oldData.reduce((max:number, item:any) => {
            return item.LigneCommandeId > max ? item.LigneCommandeId : max;
          }, 0);

          this.ligneCommandeObjet.LigneCommandeId = maxId + 1;
          // Convert FournitureID select value string to integer to perform join
          this.ligneCommandeObjet.FounitureId = parseInt(this.ligneCommandeObjet.FounitureId.toString(), 10);
          oldData.push(this.ligneCommandeObjet);
          // Save in localstorage
          localStorage.setItem('LigneCommande', JSON.stringify(oldData));
        }
      }else {
        // If record with fournitureId exist, raise alert
        alert('La fourniture existe déja. Veuillez choisir une nouvelle!');
      }
    }
    // Reset form
    this.ligneCommandeObjet = new LigneCommandeObjet();
    // Refresh Table
    this.getLigneCommande();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Mode Edit activate - LigneCommande - Front
  onEdit(item: LigneCommandeObjet){
    this.isedit = true;
    this.ligneCommandeObjet = item;
  }

  // Update Data - LigneCommande - Front
  onUpdate(ligneCommandeObjet: LigneCommandeObjet) {
    const isData = localStorage.getItem('LigneCommande');
    if (isData !== null) {
      const oldData = JSON.parse(isData);
      for (let index = 0; index < oldData.length; index++) {
        if (oldData[index].LigneCommandeId == ligneCommandeObjet.LigneCommandeId){
          // Convert fournitureID select value to integer
          this.ligneCommandeObjet.FounitureId = parseInt(this.ligneCommandeObjet.FounitureId.toString(), 10);
          oldData[index] = this.ligneCommandeObjet;
        }
      }

      // Update data on localstorage - Cheick to avoid record with null data
      if (this.ligneCommandeObjet.FounitureId === 0 || this.ligneCommandeObjet.Qte === 0) {
        alert('Veuillez remplir correctement les champs!');
      } else {
        localStorage.setItem('LigneCommande', JSON.stringify(oldData));
      }
    }
    // Reset form
    this.ligneCommandeObjet = new LigneCommandeObjet();
    // Refresh Table
    this.getLigneCommande();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Delete Data - LigneCommande - Front
  onDelete(item: LigneCommandeObjet) {
    const isData = localStorage.getItem('LigneCommande');
    if(confirm("Voulez vous vraiment supprimer cette fourniture ?")) { 
      if (isData != null) {
        const localData = JSON.parse(isData);
        for (let index = 0; index < localData.length; index++) {
          if (localData[index].FounitureId == item.FounitureId){
            localData.splice(index,1);
          }
        }
        localStorage.setItem('LigneCommande', JSON.stringify(localData));
        this.getLigneCommande();
        this.isedit = false;
      }
    }
  }

  public showSuccess():void {
    this._toast.success('Commande crée avec succès', this.codeCommande);
  }

}

export class LigneCommandeObjet {
  LigneCommandeId: number;
  FounitureId: string | number;
  Qte: string | number;

  constructor(){
    this.LigneCommandeId = 0;
    this.FounitureId = '';
    this.Qte = '';
  }

}

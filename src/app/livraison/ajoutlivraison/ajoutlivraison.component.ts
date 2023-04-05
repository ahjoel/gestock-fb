import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommandeService } from 'src/app/service/commande.service';
import { FournitureService } from 'src/app/service/fourniture.service';
import { LivraisonService } from 'src/app/service/livraison.service';

@Component({
  selector: 'app-ajoutlivraison',
  templateUrl: './ajoutlivraison.component.html',
  styleUrls: ['./ajoutlivraison.component.css']
})
export class AjoutlivraisonComponent {
  ligneLivraisonObjet: LigneLivraisonObjet;
  ligneLivraisonTab: LigneLivraisonObjet[] = [];
  isedit:boolean=false;
  data:any;
  datas:any;
  total:any;
  lcommandes:any;
  fournitures:any;
  codeLivraison:string;
  fournisseur:string;
  dateLivraison:Date|string;
  livraisonId:any;
  ligneCommandes: any;
  commandes: any;


  constructor(
    private _livraisonService: LivraisonService,
    private _fournitureService: FournitureService,
    private _commandeService: CommandeService,
    private _toast:ToastrService,
    // private _listeCommandes: 
  ){
    this.ligneLivraisonObjet = new LigneLivraisonObjet();
    this.codeLivraison = '';
    this.dateLivraison = '';
    this.fournisseur = '';
    this.total = 0;
  }

  ngOnInit():void {
    this.isedit = false;
    // Initialisation du tableau des lignes de livraison(jointure)
    this.getLigneLivraison();

    // Initialisation du select des commandes de fournitures
    this.getDataCommandes();
    
    // Initialisation d'un nouveau code pour la livraison
    this.getNewCodeLivraison();
    // this.fournitures = this.getDataFournitures();
  }

  // Code livraison
  getNewCodeLivraison() {
    this._livraisonService.getData().subscribe(res=>{
      // Recuperation de la date actuelle, comptage des livraisonS existantes avec incrementation pour une nouvelle
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2,'0');
      const month = (currentDate.getMonth() +1).toString().padStart(2,'0');
      const year = currentDate.getFullYear().toString();
      const date_code = `ENT${day}${month}${year}`;
      this.codeLivraison = date_code + (res.length + 1);
    })
  }

  // Read Data
  getLigneLivraison() {
    const isData = localStorage.getItem('LigneLivraison');
    // Cheick data from localstorage for LigneLivraison
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.ligneLivraisonTab = localData;
    }
    // Cheick fourniture data from json server
    this._fournitureService.getData().subscribe(res=>{
      this.fournitures = res;

      this._commandeService.getDataListLigneCommandeFourniture().subscribe(res_ligne_commande=>{
        this.ligneCommandes = res_ligne_commande;
      

        this._commandeService.getData().subscribe(res_commande=>{
          this.commandes = res_commande;
        

          // Use join between ligneCommandeTab and fourniture to perform data show on table
          this.datas = this.ligneLivraisonTab?.map((ligneLivraison: { FounitureId: any; LigneCommandeId: any }) =>{
            const fourniture = this.fournitures?.find((fourniture: { id: any; }) => fourniture.id === ligneLivraison.FounitureId);
            const lignecommande = this.ligneCommandes?.find((ligneCommande: { id: any; }) => ligneCommande.id === ligneLivraison.LigneCommandeId);
            const commandes = this.commandes?.find((commande: { id: any; CommandeId:any }) => commande.id === lignecommande.CommandeId);
            return {
              ...ligneLivraison,
              fourniture,
              lignecommande,
              commandes
            }
          })
          // Calcul du prix total des livraisons
          this.total = this.datas ? this.datas.reduce((acc:any, cur:any) => acc + (cur.Qte * cur.Prix), 0) : 0
          // console.log('Data', (new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy HH:mm:ss')));
        })

      })

    })
    // const fournits = this.getDataFournitures();
  }

  // Formatage du prix total
  formatNumberWithCommas(number: number): string {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  // Select pour la sélection des commandes dans le formulaire creation de ligne livraison
  getDataCommandes(){
    this._commandeService.getDataListLigneCommandeFourniture().subscribe(ligne_commandes=>{
      this._commandeService.getDataListCommande().subscribe(commandes=>{
        this._commandeService.getDataListFourniture().subscribe(fournitures=>{
          this.lcommandes = ligne_commandes.map((ligne_commande: { CommandeId: any; FounitureId:any }) =>{
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

  // Select pour la selection de la fourniture en fonction de la commande selectionné dans le formulaire creation de ligne livraison
  onChangeCommande(){
    this._commandeService.getFournituresByLigneCommandeId(this.ligneLivraisonObjet.LigneCommandeId).subscribe(ligne_commandes=>{
      this._commandeService.getDataListFourniture().subscribe(fournitures=>{
        this.data = ligne_commandes.map((ligne_commande: {FounitureId:any})=>{
          const fourniture = fournitures.find((fourt: { id: any; }) => fourt.id === ligne_commande.FounitureId);
          return {
            ...ligne_commande,
            fourniture
          }
        })
      })
    })
  }

  // Create Data - LigneLivraison - Front
  onSave() {
    const isData = localStorage.getItem('LigneLivraison');
    if (isData == null) {
      // First Record with set first ID
      const newArr = [];
      this.ligneLivraisonObjet.LigneLivraisonId = 1;
      // Convert FournitureId select value string to integer to perform join
      this.ligneLivraisonObjet.FounitureId = parseInt(this.ligneLivraisonObjet.FounitureId.toString(), 10);
      this.ligneLivraisonObjet.LigneCommandeId = parseInt(this.ligneLivraisonObjet.LigneCommandeId.toString(), 10);
      newArr.push(this.ligneLivraisonObjet);
      // Save in localstorage
      localStorage.setItem('LigneLivraison', JSON.stringify(newArr));
    } else {
      // Second Record with increment ID
      const oldData = JSON.parse(isData);

      // Convert FournitureID select value string to integer to perform control duplicate data
      this.ligneLivraisonObjet.FounitureId = parseInt(this.ligneLivraisonObjet.FounitureId.toString(), 10);
      const datafind = oldData?.find((e: { FounitureId: any; }) => e.FounitureId === this.ligneLivraisonObjet.FounitureId);

      // Convert CommandeID select value string to integer to perform control duplicate data
      this.ligneLivraisonObjet.LigneCommandeId = parseInt(this.ligneLivraisonObjet.LigneCommandeId.toString(), 10);
      const datafind_1 = oldData?.find((d: { LigneCommandeId: any; }) => d.LigneCommandeId === this.ligneLivraisonObjet.LigneCommandeId);
      

      // Cheick to eliminate double record with FournitureId and LigneCommandeId
      if ((datafind == null) || (datafind_1 == undefined)){
        // Cheick to avoid record with null data
        if (this.ligneLivraisonObjet.FounitureId === 0 || this.ligneLivraisonObjet.Qte === 0) {
          alert('Veuillez remplir correctement les champs!');
        } else {
  
          // Get MaxID
          const maxId = oldData.reduce((max:number, item:any) => {
            return item.LigneLivraisonId > max ? item.LigneLivraisonId : max;
          }, 0);

          this.ligneLivraisonObjet.LigneLivraisonId = maxId + 1;
          // Convert FournitureID select value string to integer to perform join
          this.ligneLivraisonObjet.FounitureId = parseInt(this.ligneLivraisonObjet.FounitureId.toString(), 10);
          // Convert CommandeID select value string to integer to perform join
          this.ligneLivraisonObjet.LigneCommandeId = parseInt(this.ligneLivraisonObjet.LigneCommandeId.toString(), 10);
          oldData.push(this.ligneLivraisonObjet);
          // Save in localstorage
          localStorage.setItem('LigneLivraison', JSON.stringify(oldData));
        }
      }else {
        // If record with fournitureId exist, raise alert
        alert('La livraison contenant cette fourniture existe déja. Veuillez choisir une nouvelle!');
      }
    }
    // Reset form
    this.ligneLivraisonObjet = new LigneLivraisonObjet();
    // Refresh Table
    this.getLigneLivraison();
    // Set false to Save another Data
    this.isedit = false;
  }

  // Mode Edit activate - LigneLivraison - Front
  onEdit(item: LigneLivraisonObjet){
    this.isedit = true;
    this.ligneLivraisonObjet = item;
  }

  // Save Livraison to json
  onSubmit() {
    const isData = localStorage.getItem('LigneLivraison');
    // Cheick if any data in localstorage exist
    if (isData !== null) {
      const livraison = {codeLivraison:this.codeLivraison, dateLivraison:this.dateLivraison, fournisseur:this.fournisseur}
      // console.log(`Data : ${this.codeCommande} et ${this.dateCommande}`);
      this.codeLivraison = this.codeLivraison;
      this._livraisonService.postdata(livraison).subscribe((res:any) => {
        this.livraisonId = res.id;
        // console.log('Commande Id', this.commandeId);
        const localData = JSON.parse(isData);

        // For loop to save all ligne livraisons
        for (let index = 0; index < localData.length; index++) {
          const ligneLivraisonFourniture = {LivraisonId: this.livraisonId, FounitureId:localData[index].FounitureId, Qte:localData[index].Qte, Prix:localData[index].Prix}
          
          // Enregistrement de toutes les lignes de livraisons dans la table livraison
          this._livraisonService.postdatalignelivraison(ligneLivraisonFourniture).subscribe((st:any)=>{
              
            const ligneLivraisonFourniture_mouvement = { dateMouvement: new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy HH:mm:ss'), LigneLivraisonId: st.id, FounitureId:localData[index].FounitureId,
               Qte:localData[index].Qte, Prix:localData[index].Prix, QteDispo:localData[index].Qte, Mode: 'Ajout', Statut: 'Active' }
              
               // Enregistrement de toutes les lignes de livraisons dans la table mouvement
               this._livraisonService.postdatalignelivraison_mouvement(ligneLivraisonFourniture_mouvement).subscribe(mou=>{})
          })
        }

        // Show Success info
        this.showSuccess();
        // Destroy localstorage
        localStorage.removeItem('LigneLivraison');
        this.datas.splice(0, this.datas.length);
        
        // Reset Commande form and create new code for order
        this.getNewCodeLivraison();
        // Reset date commande input
        this.dateLivraison = '';
        this.fournisseur = '';
      })

    }else{
      alert('Veuillez insérer au moins une ligne de livraison de fourniture.');
    }
  }

  // Delete Data - LigneCommande - Front
  onDelete(item: LigneLivraisonObjet) {
    const isData = localStorage.getItem('LigneLivraison');
    if(confirm("Voulez vous vraiment supprimer cette livraison ?")) { 
      if (isData != null) {
        const localData = JSON.parse(isData);
        for (let index = 0; index < localData.length; index++) {
          if (localData[index].LigneCommandeId == item.LigneCommandeId){
            localData.splice(index,1);
          }
        }
        localStorage.setItem('LigneLivraison', JSON.stringify(localData));
        this.getLigneLivraison();
        this.isedit = false;
      }
    }
  }

  public showSuccess():void {
    this._toast.success('Livraison crée avec succès', this.codeLivraison);
  }

}

export class LigneLivraisonObjet {
  LigneLivraisonId: number;
  LigneCommandeId: string | number;
  FounitureId: string | number;
  Qte: string | number;
  Prix: string | number;

  constructor(){
    this.LigneLivraisonId = 0;
    this.LigneCommandeId = '';
    this.FounitureId = '';
    this.Qte = '';
    this.Prix = '';
  }

}

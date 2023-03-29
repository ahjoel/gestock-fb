import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { CategorieComponent } from './categorie/categorie.component';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FournitureComponent } from './fourniture/fourniture.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CommandeComponent } from './commande/commande.component';
import { AjoutcommandeComponent } from './commande/ajoutcommande/ajoutcommande.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategorieComponent, canActivate: [AuthGuard] },
  { path: 'fournitures', component: FournitureComponent, canActivate: [AuthGuard] },
  { path: 'commandes', component: CommandeComponent, canActivate: [AuthGuard] },
  { path: 'commandes/ajout_commande', component: AjoutcommandeComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'commandes', component: CommandeComponent,
  //   children: [
  //     { path: 'ajout_commande', component: AjoutcommandeComponent },
  //   ],canActivate: [AuthGuard]
  // },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    FooterComponent,
    CategorieComponent,
    FournitureComponent,
    LoginComponent,
    CommandeComponent,
    AjoutcommandeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton:true, 
      timeOut:5000,
      progressBar:true
    }),
    RouterModule.forRoot(routes),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

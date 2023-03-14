import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'categories', component: CategorieComponent },
  { path: 'fournitures', component: FournitureComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    FooterComponent,
    CategorieComponent,
    FournitureComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
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

import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { Location } from '@angular/common';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit {

  constructor(private location: Location){}

  ngOnInit():void{
    // this.login();
  }

  ngAfterViewInit(): void {
    $('#dataTable').DataTable();
  }

  login() {
    // your login logic here
    window.location.reload();
  }
}

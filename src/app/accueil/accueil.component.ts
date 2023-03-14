import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    $('#dataTable').DataTable();
  }
}

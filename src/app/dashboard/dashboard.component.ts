import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public router: Router){}

  ngOnInit() {
    (() => {
      'use strict';
      $('#sidebarToggle, #sidebarToggleTop').on('click', function (e: any) {
        $('body').toggleClass('sidebar-toggled');
        $('.sidebar').toggleClass('toggled');
        if ($('.sidebar').hasClass('toggled')) {
          $('.sidebar .collapse').collapse('hide');
        }
      });
  
      $(window).resize(function () {
        if ($(window).width() < 768) {
          $('.sidebar .collapse').collapse('hide');
        }
        if ($(window).width() < 480 && !$('.sidebar').hasClass('toggled')) {
          $('body').addClass('sidebar-toggled');
          $('.sidebar').addClass('toggled');
          $('.sidebar .collapse').collapse('hide');
        }
      });

    })();
  }


  logout() {
    // Remove authentication token or other data that identifies the user
    // from the application state.
    // For example, if you are using JWT authentication, you could remove the token from the browser's local storage:
    localStorage.removeItem('token');

    // Redirect the user to the login page or any other appropriate page.
    this.router.navigate(['/login']);
  }
  
}

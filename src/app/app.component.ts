import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var $: any; 

// declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gestock-fb-2';
  name = 'Jquery Integration With Angular!';  
  
  isJqueryWorking: any;  
  // ngOnInit()  
  // {  
  //   $(document).ready(() => {  
  //       this.isJqueryWorking = 'Jquery is working !!!';  
  //   }); 
     
  // } 
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

  
      // $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e: any) {
      //   let o;
      //   if (768 < $(window).width()) {
      //     o = e.originalEvent;
      //     let delta = o.wheelDelta || -o.detail;
      //     this.scrollTop += 30 * (delta < 0 ? 1 : -1);
      //     e.preventDefault();
      //   }
      // });
  
      // $(document).on('scroll', function () {
      //   if (100 < $(this).scrollTop()) {
      //     $('.scroll-to-top').fadeIn();
      //   } else {
      //     $('.scroll-to-top').fadeOut();
      //   }
      // });
  
      // $(document).on('click', 'a.scroll-to-top', function (e: any) {
      //   const o = $(this);
      //   $('html, body')
      //     .stop()
      //     .animate(
      //       { scrollTop: $(o.attr('href')).offset().top },
      //       1000,
      //       'easeInOutExpo'
      //     );
      //   e.preventDefault();
      // });
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

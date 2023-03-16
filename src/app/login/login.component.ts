import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup|any;
  
  constructor(private _authService:AuthenticationService, private router: Router, private _toast:ToastrService, private accueil: AppComponent){}

  ngOnInit(): void{
    this.loginForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl(),
   })
  }

  submit(loginForm:FormGroup) {
    const { username, password } = this.loginForm.value;
    console.log(this.loginForm.value);
    console.log('Après', username, 'Mop', password);
    this._authService.login(username, password).subscribe(
      (data: any) => {
        // Store the token in local storage or a cookie
        localStorage.setItem('token', data.token);
        // Redirect the user to the home page
        // this.accueil.reloadPage();
        // this.router.navigate(['/accueil']);
        this.router.navigateByUrl('/accueil', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
          window.location.reload();
        });
        // this.router.navigateByUrl(['/acceuil'], {});
      },
      (error: any) => {
        // Handle login errors
        this.showError();
        console.error(error);
      }
    );
  }

  public showError():void {
    this._toast.error('Identifiants incorrectes');
  }
}

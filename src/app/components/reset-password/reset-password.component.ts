import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone:true
})
export class ResetPasswordComponent {
  constructor(private router:Router){}
  login(){
    this.router.navigate(['/login'])
  }
  signUP(){
    this.router.navigate(['/sign-up'])
  }
  forgot(){
    this.router.navigate(['/login'])
  }
}

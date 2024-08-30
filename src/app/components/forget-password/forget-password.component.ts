import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone:true
})
export class ForgetPasswordComponent {
  constructor(private router:Router){}
  login(){
    this.router.navigate(['/login'])
  }
  signUP(){
    this.router.navigate(['/sign-up'])
  }
}

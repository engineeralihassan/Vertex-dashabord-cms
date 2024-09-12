import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  standalone:true
})
export class UpdatePasswordComponent {
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

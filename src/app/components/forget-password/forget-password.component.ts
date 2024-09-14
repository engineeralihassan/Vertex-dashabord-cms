import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  imports:[RouterModule,RouterLink],
  standalone:true,
})
export class ForgetPasswordComponent {
  constructor(private router:Router){}
  login(){
    this.router.navigate(['/reset-password'])
  }
  signUP(){
    this.router.navigate(['/sign-up'])
  }
}

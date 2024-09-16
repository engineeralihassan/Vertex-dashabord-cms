import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss'],
  standalone:true,
  imports:[MatButtonModule,MatDialogModule]
})
export class ConfirmationAlertComponent {
constructor(private authService:AuthService){

}
logout(){
  this.authService.logout();
}
}

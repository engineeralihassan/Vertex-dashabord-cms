import { Component, inject } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone:true,
  imports:[LoaderComponent,CommonModule,RouterModule,MatTooltipModule]
})
export class NotificationsComponent {
  notifications:any[]=[];
  isLaoding:boolean=true;
  private _snackBar = inject(MatSnackBar);
constructor(private notificationService:NotificationsService){

}
ngOnInit(){
this.getAllNotifications();
}
createNamegetInitials(name:string) {
  return name.split(' ').map(n => n[0].toUpperCase()).join('');
}
openSnackBar(message: string, action: string, type: string) {
  this._snackBar.open(message, action, {
    duration: 3000,
    panelClass: [`${type}`],
  });
}

markAsRead(id:any,index:any){
  if(!this.notifications[index].isRead){
    console.log("Heelloooo");
    this.notificationService.markRead({id}).subscribe((data:any)=>{
      this.notifications[index].isRead=true;
    })
  }

}

markallRead(){
  this.notificationService.markAllAsRead().subscribe((data:any)=>{
  this.openSnackBar("All notifications are marked as read","close",'success-snackbar');
  this.notifications=[];
 this.getAllNotifications();
  })
}
getAllNotifications(){
  this.notificationService.getAllNotifications().subscribe((data:any)=>{
    this.isLaoding=false;
    this.notifications=data?.data?.notifications;
  }) 
}
formateDate(dateStr:any){
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Format the date components
  const formattedDate = `${hours}:${minutes < 10 ? '0' : ''}${minutes}  ${day}/${month}/${year}`;
  return formattedDate;
    }

}

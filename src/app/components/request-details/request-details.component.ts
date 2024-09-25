import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestsService } from 'src/app/services/requests.service';
import { formatDateAccordingToTimeZone } from 'src/app/utils/dateFormate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  standalone:true,
  imports:[CommonModule,MatDialogModule,]

})
export class RequestDetailsComponent {
  url:string=environment.docsUrl;
  data:any;
  constructor(private requestService:RequestsService){}
  ngOnInit(){
    this.requestService.getRequestData().subscribe((data:any)=>{
          this.data=data;
    })
  }
  createNamegetInitials(name:string) {
    return name.split(' ').map(n => n[0]?.toUpperCase()).join('');
  }
formateDate(date:any){
 return formatDateAccordingToTimeZone(date)
}
}

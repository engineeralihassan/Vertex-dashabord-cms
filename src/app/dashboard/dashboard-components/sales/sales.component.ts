import { Component} from '@angular/core';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { DashbaordService } from 'src/app/services/dashbaord.service';
import { SocketService } from 'src/app/services/socket.service';





@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],


})
export class SalesComponent {
  stats:any[]=[];
  isLoading=true;
 constructor(private dashbaordService:DashbaordService, private socketService:SocketService) { }

 ngOnInit() {
   console.log("HHHHHHHHHHH",this.stats);
this.dashbaordService.getStats().subscribe((data:any)=>{
this.stats=data.data.stats;
console.log("HHHHHHHHHHH",this.stats);
this.isLoading=false;
})
this.socketService.onNewNotification().subscribe((data) => {
  this.dashbaordService.getStats().subscribe((data:any)=>{
    this.stats=data.data.stats;
    this.isLoading=false;
    })

});
 }


}

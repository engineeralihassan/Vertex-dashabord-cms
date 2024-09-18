import { Component, OnInit } from '@angular/core';
import { DashbaordService } from 'src/app/services/dashbaord.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
})
export class ActivityComponent implements OnInit {
   stats:any[]=[];
   isLoading=true;
  constructor(private dashbaordService:DashbaordService) { }

  ngOnInit() {
    console.log("HHHHHHHHHHH",this.stats);
this.dashbaordService.getStats().subscribe((data:any)=>{
this.stats=data.data.stats;
console.log("HHHHHHHHHHH",this.stats);
this.isLoading=false;
})
  }


  
}

import { Component } from '@angular/core';
import { JodEditorComponent } from '../jod-editor/jod-editor.component';
import { CareersService } from 'src/app/services/careers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-edit-jobpost',
  templateUrl: './edit-jobpost.component.html',
  styleUrls: ['./edit-jobpost.component.scss'],
  standalone:true,
  imports:[JodEditorComponent,DemoFlexyModule,CommonModule,LoaderComponent]
})
export class EditJobpostComponent {
  jobData:any;
  id:any;
  isLoading:boolean=true;
constructor(private careersService:CareersService, private route:ActivatedRoute, private router:Router){
  this.route.params.subscribe(params => {
    this.isLoading=true;
    console.log("We are in the page calling 1");
    this.id = params['id']; 
    this.getJob(this.id);
  })
}
ngOnInit(){}
getJob(id:any){
this.careersService.getJob(`/${id}`).subscribe((res:any)=>{
  let job= res.data.job
  const formObject = {
    title: job.title,
    category: job.filters.category,
    level: job.filters.level,
    type: job.filters.type,
    technology: job.filters.technology,
    country: job.filters.country,
    state: job.filters.state,
    city: job.filters.city,
    address: '', 
    content: job.jobDetail,
    jobId:job._id
  };
  console.log(formObject);
  this.jobData=formObject;
  this.isLoading=false;
},(error:any)=>{
  if(error.status===404){
   this.router.navigate(['/no-page-found-error'])
  }
})
}
}




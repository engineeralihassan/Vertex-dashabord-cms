import { Component } from '@angular/core';
import { JodEditorComponent } from '../jod-editor/jod-editor.component';
import { CareersService } from 'src/app/services/careers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { BlogsService } from 'src/app/services/blogs.service';
import { BlogEditorComponent } from '../blog-editor/blog-editor.component';

@Component({
  selector: 'app-update-blogpost',
  templateUrl: './update-blogpost.component.html',
  styleUrls: ['./update-blogpost.component.scss'],
  standalone:true,
  imports:[JodEditorComponent,DemoFlexyModule,CommonModule,LoaderComponent,BlogEditorComponent]


})
export class UpdateBlogpostComponent {
  jobData:any;
  id:any;
  isLoading:boolean=true;
constructor(private blogService:BlogsService, private route:ActivatedRoute, private router:Router){
  this.route.params.subscribe(params => {
    this.isLoading=true;
    console.log("We are in the page calling 1");
    this.id = params['id']; 
    this.getJob(this.id);
  })
}
ngOnInit(){}
getJob(id:any){
  this.isLoading=false;
this.blogService.getBlog(`/${id}`).subscribe((res:any)=>{
  let blog= res.data.blog
  const formObject = {
    title: blog.title,
    category: blog.category,
    description: blog.description,
    ctaTitle: blog.ctaData.title,
    ctaBtn: blog.ctaData.btnText,
    ctaUrl: blog.ctaData.url,
    thumbnailPhoto:blog.thubmnailPhoto,
    featurePhoto:blog.featurePhoto,
    author: blog.author,
    content: blog.content,
    blogId:blog._id
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

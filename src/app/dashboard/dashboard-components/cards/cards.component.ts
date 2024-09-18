import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs.service';
import { environment } from 'src/environments/environment';

interface cards {
  image: string;
  btn: string;
  title:String,
  description:String
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  url=environment.docsUrl;
  blogs:any[]=[]

  constructor(private blogsService:BlogsService, private router:Router) { }

  ngOnInit(): void {
    this.blogsService.getAllblogs().subscribe((data:any)=>{
      this.blogs=data?.data?.blogs;
    })
  }

  navigation(){
  this.router.navigate(['/blogs']);
  }

}

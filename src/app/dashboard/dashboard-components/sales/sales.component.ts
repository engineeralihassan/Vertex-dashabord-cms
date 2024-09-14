import { Component} from '@angular/core';





@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],


})
export class SalesComponent {

  statItems:any[]=[
    {name:'Contact Requests',count:'#23',link:'/requests-data/contact-us'},
    {name:'Job Applications',count:'#12',link:'/requests-data/job-applications'},
    {name:'Training Requests',count:'#05',link:'/requests-data/training-requests'},
    {name:'Blogs',count:'#12',link:'/blogs'},
    {name:'Blogs Subscriptions',count:'#112',link:'/requests-data/blog-subscriptions'},
    {name:'Running Products',count:'#04',link:'/products'},
  ]


  constructor() {
  }


}

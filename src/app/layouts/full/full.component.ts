import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon?: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;
  hidden:boolean=false;
  notifications:number=3;
  othersPageActive:boolean=false;
  requestsPage:boolean=false

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router:Router) { }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/dashboard",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/button",
      icon: "bar-chart-2",
      menu: "Services"
    },
    {
      link: "/forms",
      icon: "layers",
      menu: "Industries",
    },
    {
      link: "/alerts",
      icon: "award",
      menu: "Company",
    },
    {
      link: "/grid-list",
      icon: "grid",
      menu: "Products",
    },
    {
      link: "/menu",
      icon: "sliders",
      menu: "Careers",
    },
    {
      link: "/blogs",
      icon: "book",
      menu: "Blogs",
    },
    {
      link: "/expansion",
      icon: "voicemail",
      menu: "Case Studies",
    },
  ]

  navigation(route:string,page:string){
    this.router.navigate([`/${route}`]);
    this.activeLinkPage(page);
  }
  deactiveLink(){
   this.othersPageActive=false;
   this.requestsPage=false;
  }
  activeLinkPage(page:string){
    if(page==='request'){
      this.requestsPage=true;
      this.othersPageActive=false;
    }else{
      this.othersPageActive=true;
      this.requestsPage=false;
    }
  }

}

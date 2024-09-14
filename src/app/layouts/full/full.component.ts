import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from 'src/app/components/confirmation-alert/confirmation-alert.component';


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
  requestsPage:boolean=false;
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log("Heeeellelele")
    this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

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
      link: "/services",
      icon: "bar-chart-2",
      menu: "Services"
    },
    {
      link: "/industries",
      icon: "layers",
      menu: "Industries",
    },
    {
      link: "/company",
      icon: "award",
      menu: "Company",
    },
    {
      link: "/products",
      icon: "grid",
      menu: "Products",
    },
    {
      link: "/careers",
      icon: "sliders",
      menu: "Careers",
    },
    {
      link: "/blogs",
      icon: "book",
      menu: "Blogs",
    },
    {
      link: "/case-studies",
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

  logout(){
    window.onbeforeunload = function() {
      // you may or may not want a condition here, e.g.
      // if (thereAreUnsavedChanges)
      return 'Are you sure you actually want to leave? You have unsaved changes...';
  }
    // this.router.navigate(['/login']);
  }

}

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

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
    {
      link: "/chips",
      icon: "slack",
      menu: "Contact Us",
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Other Pages",
    },
    // {
    //   link: "/progress",
    //   icon: "bar-chart-2",
    //   menu: "Progress Bar",
    // },
    // {
    //   link: "/toolbar",
    //   icon: "voicemail",
    //   menu: "Toolbar",
    // },
    // {
    //   link: "/progress-snipper",
    //   icon: "loader",
    //   menu: "Progress Snipper",
    // },
    // {
    //   link: "/tooltip",
    //   icon: "bell",
    //   menu: "Tooltip",
    // },
    // {
    //   link: "/snackbar",
    //   icon: "slack",
    //   menu: "Snackbar",
    // },
    // {
    //   link: "/slider",
    //   icon: "sliders",
    //   menu: "Slider",
    // },
    // {
    //   link: "/slide-toggle",
    //   icon: "layers",
    //   menu: "Slide Toggle",
    // },
  ]

}

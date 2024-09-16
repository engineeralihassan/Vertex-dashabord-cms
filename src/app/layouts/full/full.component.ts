import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from 'src/app/components/confirmation-alert/confirmation-alert.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

interface sidebarMenu {
  link: string;
  icon?: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {
  mediaUrl:any=environment.userMediaUrl;
  search: boolean = false;
  hidden: boolean = false;
  othersPageActive: boolean = false;
  requestsPage: boolean = false;
  user:any;
  readonly dialog = inject(MatDialog);
  notifications: any[] = [];
  private notificationSubscription!: Subscription;

  ngOnInit() {
    this.notificationSubscription = this.notificationService.getNotificationUpdates().subscribe(notifications => {
      // Check if new notifications are received
      console.log("New notifications",notifications);
      if (this.notifications.length > this.notifications.length) {
        this.playNotificationSound();
        this.notifications = notifications;
      }
    });

    this.notificationService.startPolling(12000); 



    this.authService.getUser().subscribe((data:any)=>{
      data.name=data?.name?.split(' ')[0];
      this.user=data
    })
    let storedUser = localStorage.getItem('vertexcmsuser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.user.name=this.user.name.split(' ')[0];
      console.log(this.user.name);
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConfirmationAlertComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService:AuthService,
    private notificationService: NotificationsService
  ) {}

  routerActive: string = 'activelink';

  sidebarMenu: sidebarMenu[] = [
    {
      link: '/dashboard',
      icon: 'home',
      menu: 'Dashboard',
    },
    {
      link: '/services',
      icon: 'bar-chart-2',
      menu: 'Services',
    },
    {
      link: '/industries',
      icon: 'layers',
      menu: 'Industries',
    },
    {
      link: '/company',
      icon: 'award',
      menu: 'Company',
    },
    {
      link: '/products',
      icon: 'grid',
      menu: 'Products',
    },
    {
      link: '/careers',
      icon: 'sliders',
      menu: 'Careers',
    },
    {
      link: '/blogs',
      icon: 'book',
      menu: 'Blogs',
    },
    {
      link: '/case-studies',
      icon: 'voicemail',
      menu: 'Case Studies',
    },
  ];

  navigation(route: string, page: string) {
    this.router.navigate([`/${route}`]);
    this.activeLinkPage(page);
  }
  deactiveLink() {
    this.othersPageActive = false;
    this.requestsPage = false;
  }
  activeLinkPage(page: string) {
    if (page === 'request') {
      this.requestsPage = true;
      this.othersPageActive = false;
    } else {
      this.othersPageActive = true;
      this.requestsPage = false;
    }
  }

  logout() {
    window.onbeforeunload = function () {
      // you may or may not want a condition here, e.g.
      // if (thereAreUnsavedChanges)
      return 'Are you sure you actually want to leave? You have unsaved changes...';
    };
    // this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  private playNotificationSound(): void {
    const audio = new Audio('../../../assets/media/notification-bell.wav'); // Update path as necessary
    audio.play();
  }

  formateDate(dateStr:any){
const date = new Date(dateStr);
const year = date.getFullYear();
const month = date.getMonth() + 1; 
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();

// Format the date components
const formattedDate = `${hours}:${minutes < 10 ? '0' : ''}${minutes}  ${day}/${month}/${year}`;
return formattedDate;
  }
}

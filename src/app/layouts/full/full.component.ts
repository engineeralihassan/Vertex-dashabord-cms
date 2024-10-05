import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from 'src/app/components/confirmation-alert/confirmation-alert.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SocketService } from 'src/app/services/socket.service';

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
  @ViewChild('myButton', { static: false }) myButton!: ElementRef;
  mediaUrl:any=environment.userMediaUrl;
  search: boolean = false;
  hidden: boolean = false;
  othersPageActive: boolean = false;
  requestsPage: boolean = false;
  user:any;
  notification: any;
  readonly dialog = inject(MatDialog);
  notifications: any[]=[];
  private notificationSubscription!: Subscription;
  notificationCount=0

  ngOnInit() {
  // Listen for notifications from the backend
  this.getAllNotifications();
  this.socketService.onNewNotification().subscribe((data) => {
    this.notification = data;
    console.log(this.notification);
    this.notifications.push(this.notification);
    this.notificationCount=this.notifications.length;
    setTimeout(()=>{
      this.myButton.nativeElement.click();
      this.playNotificationSound();
    },100)

  });
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

  getAllNotifications(){
    this.notificationService.getAllNotifications().subscribe((data:any)=>{
      this.notifications=data?.data?.notifications;
      let unread= this.notifications.filter((item) => !item.isRead  );
      this.notificationCount=unread?.length;
    })
  }


  ngAfterViewInit() {
    setTimeout(()=>{
      this.myButton.nativeElement.click();
    },1000)
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

  readNotification(){
    this.notificationCount=0;
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
    private notificationService: NotificationsService,
    private socketService: SocketService,
  ) {}

  routerActive: string = 'activelink';

  sidebarMenu: sidebarMenu[] = [
    {
      link: '/dashboard',
      icon: 'home',
      menu: 'Dashboard',
    },
    {
      link: '/requests-data/contactus-request',
      icon: 'bar-chart-2',
      menu: 'Contact Requests',
    },
    {
      link: '/requests-data/job-request',
      icon: 'layers',
      menu: 'Job Applications',
    },
    {
      link: '/requests-data/bolg-subscriptions',
      icon: 'award',
      menu: 'Blog Subscriptions',
    },
    // {
    //   link: '/products',
    //   icon: 'grid',
    //   menu: 'Products',
    // },
    // {
    //   link: '/careers',
    //   icon: 'sliders',
    //   menu: 'Careers',
    // },
    // {
    //   link: '/blogs',
    //   icon: 'book',
    //   menu: 'Blogs',
    // },
    // {
    //   link: '/case-studies',
    //   icon: 'voicemail',
    //   menu: 'Case Studies',
    // },
    {
      link: '/notifications',
      icon: 'bell',
      menu: 'Notifications',
    },
  ];

  navigation(route: string, page: string) {
    this.router.navigate([`/${route}`]);
    this.activeLinkPage(page);
  }
  navigation1(route: string, page: string) {
    this.router.navigate([`/${route}`]);
   
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
      this.requestsPage = false;
      this.othersPageActive = false;
    }
  }

  private playNotificationSound(): void {
    const audio = new Audio('../../../assets/media/notification-bell.wav'); 
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

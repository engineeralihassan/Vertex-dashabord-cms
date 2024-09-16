import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NetworkService } from './services/network.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flexy-angular';
  isOnline: boolean = navigator.onLine;
  private _snackBar = inject(MatSnackBar);
  constructor(private router: Router,private networkStatusService: NetworkService,private location:Location) { }

  ngOnInit() {
    this.networkStatusService.getNetworkStatus().subscribe((status: boolean) => {
      if (this.isOnline !== status) {  // Check if status has actually changed
        this.isOnline = status;
        this. showSnackbar(this.isOnline);
      }
    });

    // Show offline message on first load if offline
    if (!navigator.onLine) {
      this.showSnackbar(false);
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${type}`],
    });
  }

  showSnackbar(isOnline: boolean) {
    if (isOnline) {
      this.openSnackBar('You are back online!', 'Close', 'success-snackbar');
      this.location.back();
        
    } else {
      this.openSnackBar('You are currently offline. Please check your internet connection.', 'Close','error-snackbar' );
      this.router.navigate(['/internet-connection-error'])
    }
  }

}

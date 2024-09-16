import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);
  private previousOnlineStatus = localStorage.getItem('isOnline') === 'true'; // Retrieve the previous state

  constructor() {
    // Initialize previous status from local storage or default to navigator's status
    this.previousOnlineStatus = this.previousOnlineStatus ?? navigator.onLine;

    // Listen for online/offline events
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));

    // Store the initial state in local storage
    localStorage.setItem('isOnline', String(navigator.onLine));
  }

  private updateOnlineStatus(isOnline: boolean) {
    if (this.previousOnlineStatus !== isOnline) {
      this.onlineStatus.next(isOnline);
      this.previousOnlineStatus = isOnline;
      localStorage.setItem('isOnline', String(isOnline)); // Store new state in local storage
    }
  }

  getNetworkStatus() {
    return this.onlineStatus.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {
    // Connect to the backend server
    this.socket = io('http://localhost:3000'); // Replace with your backend URL
  }

  // Listen for new notifications
  onNewNotification(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newNotification', (data: any) => {
        observer.next(data);
      });
    });
  }
}

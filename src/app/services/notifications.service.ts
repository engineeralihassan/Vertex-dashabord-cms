import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  apiUrl:string=  environment.baseUrl+'notifications';
  private notificationSubject = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching notifications', error);
        return of([]);
      })
    );
  }

  getNotificationUpdates(): Observable<any[]> {
    return this.notificationSubject.asObservable();
  }

  startPolling(interval: number): void {
    console.log("Send request of the notigfications");
    setInterval(() => {
      this.getNotifications().pipe(
        tap((notifications:any) => this.notificationSubject.next(notifications))
      ).subscribe();
    }, interval);
  }
}

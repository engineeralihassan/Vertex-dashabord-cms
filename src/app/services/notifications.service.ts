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

  getAllNotifications(){
    return this.http.get(this.apiUrl);
  }
  markAllAsRead(){
   return this.http.put(`${this.apiUrl}/mark-all-as-read`,{})
  }
  markRead(data:any){
    return this.http.patch(`${this.apiUrl}`,data)
   }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  apiUrl:string=  environment.baseUrl+'submissions/';
  private notificationSubject = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getSubmissions(route:any){
    return this.http.get(this.apiUrl+route);
  }
  markAllAsRead(){
   return this.http.put(`${this.apiUrl}/mark-all-as-read`,{})
  }
  markRead(data:any){
    return this.http.patch(`${this.apiUrl}`,data)
   }

   updateRequest(route:any,data:any){
    return this.http.patch(this.apiUrl+route,data)
   }
}

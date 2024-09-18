import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  apiUrl:string=  environment.baseUrl+'blogs';

  constructor(private http :HttpClient) { }
  getAllblogs(){
   return this.http.get(this.apiUrl);
  }

  getAllblogSubscriptions(route:any){
    return this.http.get(this.apiUrl+route);
   }

}

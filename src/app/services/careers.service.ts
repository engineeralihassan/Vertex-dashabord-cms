import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  apiUrl:string=  environment.baseUrl+'jobs';

  constructor(private http :HttpClient) { }
  getAllJobs(){
   return this.http.get(this.apiUrl);
  }
  updateJob(route:any,data:any){
    return this.http.patch(this.apiUrl+route,data);
   }
  createBlog(data:any){
    return this.http.post(this.apiUrl,data);
   }

  getAllblogSubscriptions(route:any){
    return this.http.get(this.apiUrl+route);
   }
}

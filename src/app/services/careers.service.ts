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
  getJob(route:any){
    return this.http.get(this.apiUrl+route);
   }
  updateJob(route:any,data:any){
    return this.http.patch(this.apiUrl+route,data);
   }

   deleteJob(route:any){
    return this.http.delete(this.apiUrl+route);
   }

  createJob(data:any){
    return this.http.post(this.apiUrl,data);
   }

  getAllblogSubscriptions(route:any){
    return this.http.get(this.apiUrl+route);
   }
}

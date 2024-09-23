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
  createBlog(data:any){
    return this.http.post(this.apiUrl,data);
   }

  getAllblogSubscriptions(route:any){
    return this.http.get(this.apiUrl+route);
   }

   getBlog(route:any){
    return this.http.get(this.apiUrl+route);
   }
  updateBlog(route:any,data:any){
    return this.http.patch(this.apiUrl+route,data);
   }

   deleteBlog(route:any){
    return this.http.delete(this.apiUrl+route);
   }

}

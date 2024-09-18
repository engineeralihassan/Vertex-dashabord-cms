import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashbaordService {
  apiUrl:string=  environment.baseUrl+'dashboard';
  constructor(private http: HttpClient,private router:Router) { }
  getStats(){
    return this.http.get(this.apiUrl,{ withCredentials: true });
  }  
}

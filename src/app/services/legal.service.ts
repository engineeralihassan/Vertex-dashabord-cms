import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LegalService {

  apiUrl:string=  environment.baseUrl+'legal';
  constructor(private http: HttpClient,private router:Router) { }
  getData(){
    return this.http.get(this.apiUrl,{ withCredentials: true });
  }
  updateData(data:any){
    return this.http.post(this.apiUrl,data);
  }  
}

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 apiUrl:string=  environment.baseUrl+'users';
 private userUpdate = new BehaviorSubject<any>({});
    // Optional headers if needed (e.g., for authentication)
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here' 
      })
    };
  
    constructor(private http: HttpClient,private router:Router) { }

     updateUserStatus(user:any) {
        this.userUpdate.next(user);
    }
  
    getUser() {
      return this.userUpdate.asObservable();
    }

    signUp(route:string,data:any) {
      return this.http.post(this.apiUrl+'/'+route,data);
    }

    resetPassword(route:any,token:any,data:any){
      return this.http.patch(this.apiUrl+'/'+route+token,data);
    }

    login(route:string,data:any) {
      return this.http.post(this.apiUrl+'/'+route,data,{
        withCredentials: true,
      });
    }
    updateUser(route:string,data:any) {
      return this.http.patch(this.apiUrl+'/'+route,data,{ withCredentials: true });
    }
    updatePassword(route:string,data:any) {
      return this.http.patch(this.apiUrl+'/'+route,data,{ withCredentials: true });
    }
    
    getAllUsers(route:any){
      return this.http.get(this.apiUrl+'/'+route,{ withCredentials: true });
    }  

logout(){
  localStorage.removeItem('vertexcmstoken')
  this.router.navigate(['/login']);
}  

 
}

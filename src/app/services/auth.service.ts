import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 apiUrl:string=  environment.baseUrl+'users'
    // Optional headers if needed (e.g., for authentication)
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here' 
      })
    };
  
    constructor(private http: HttpClient) { }

    signUp(route:string,data:any) {
      return this.http.post(this.apiUrl+'/'+route,data);
    }
  
    // Get all users
    getUsers() {
      return this.http.get(this.apiUrl);
    }
  
    // Get a single user by ID
    getUserById(id: number) {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get(url);
    }
  
    // Add a new user (Create)
    addUser(user:any) {
      return this.http.post(this.apiUrl, user, this.httpOptions);
    }
  
    // Update an existing user
    updateUser(id: number, user:any) {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put(url, user, this.httpOptions);
    }
  
    // Delete a user
    deleteUser(id: number): Observable<{}> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url, this.httpOptions);
    }
}

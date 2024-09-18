import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('vertexcmstoken');
    
    // Clone the request and set the Authorization header if the token is available
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Handle the request and navigate on 401 without modifying the error
    return next.handle(authReq).pipe(
      catchError((error: any) => {

        if ( error.status === 401) {
          // Redirect to login page if 401 error occurs
          this.router.navigate(['/login']); 
        }
        // Return the error without modifying it
        return throwError(error);
      })
    );
  }
}

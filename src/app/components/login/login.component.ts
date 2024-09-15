import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  subscription!:Subscription;
  private timeoutId:any;
  userForm!: FormGroup;
  isSubmitting: boolean = false;
  private _snackBar = inject(MatSnackBar);
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${type}`],
    });
  }

  createForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  login(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
    this.subscription=  this.authService.login('login', this.userForm.value).subscribe(
        (user: any) => {
          this.isSubmitting = false;
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
      
          // Start a new timeout
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
          this.openSnackBar(
            'Login successfully 🎉',
            'Close',
            'success-snackbar'
          );
          
        },
        (error: any) => {
          this.isSubmitting = false;
          console.log(error)
          if (error?.message) {
            this.openSnackBar(
              error?.error.message,
              'Close',
              'error-snackbar'
            );
            return;
          }
          this.openSnackBar(
            'Something went 😔 wront Please try again',
            'Close',
            'error-snackbar'
          );
        }
      );
    }
  }


  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  signUP(){
    this.router.navigate(['/sign-up'])
  }
  forgot(){
    this.router.navigate(['/forgot-password'], { queryParams: {email: this.userForm.value.email } });
  }
}

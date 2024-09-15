import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  signUp(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      console.log(this.userForm.value);
    this.subscription=  this.authService.signUp('signup', this.userForm.value).subscribe(
        (user: any) => {
          this.isSubmitting = false;
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
      
          // Start a new timeout
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
          this.openSnackBar(
            'Hurray 🎉 you signup successfully',
            'Close',
            'success-snackbar'
          );
          
        },
        (error: any) => {
          this.isSubmitting = false;
          if (error?.error?.error?.keyValue?.email) {
            this.openSnackBar(
              'This email already registered Please login',
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

  login() {
    this.router.navigate(['/dashboard']);
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

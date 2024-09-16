import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})
export class ResetPasswordComponent {
  token:any;
  subscription!:Subscription;
  private timeoutId:any;
  userForm!: FormGroup;
  isSubmitting: boolean = false;
  private _snackBar = inject(MatSnackBar);
  constructor(private router:Router,private route:ActivatedRoute,    private fb: FormBuilder,
    private authService: AuthService){}

  ngOnInit(): void {
    // Get the token from the URL
    this.token = this.route.snapshot.paramMap.get('token');
    
    if (this.token) {
      console.log('Token:', this.token);
    }
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
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: this.passwordMatchValidator });
  }

  get f() {
    return this.userForm.controls;
  }

   // Custom Validator for matching password and confirmPassword
   passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };  // Return an error if passwords don't match
    }
    return null;  // Return null if there is no error
  }


  signUp(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
    this.subscription=  this.authService.resetPassword('resetPassword/',this.token, this.userForm.value).subscribe(
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
            'Hurray 🎉 your password reset successfully',
            'Close',
            'success-snackbar'
          );
          
        },
        (error: any) => {
          this.isSubmitting = false;
          if (error?.error?.message) {
            this.openSnackBar(
              error.error.message,
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
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  imports:[RouterModule,RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  standalone:true,
})
export class ForgetPasswordComponent {
  subscription!:Subscription;
  email:string='';
  private timeoutId:any;
  userForm!: FormGroup;
  isSubmitting: boolean = false;
  private _snackBar = inject(MatSnackBar);
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.queryParams.subscribe((params:any)=>{
     this.email=params['email'];
     if(this.email){
      this.userForm.patchValue({
        email:this.email
      })
     }
    })
    
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
    });
  }

  get f() {
    return this.userForm.controls;
  }

  forgotPassword(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
    this.subscription=  this.authService.login('forgotPassword', this.userForm.value).subscribe(
        (user: any) => {
          this.isSubmitting = false;
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
      
          // Start a new timeout

          this.openSnackBar(
            'we sent an reset password link to your account 🎉',
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


}

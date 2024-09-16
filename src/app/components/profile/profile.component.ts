import { Component, inject } from '@angular/core';
import { Truck } from 'angular-feather/icons';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[MatSelectModule,MatFormFieldModule,MatInputModule,CommonModule,MatButtonModule,FormsModule,ReactiveFormsModule]
})
export class ProfileComponent {
  mediaUrl:any=environment.userMediaUrl;
  userForm!: FormGroup;
  subscription!:Subscription;
  private timeoutId:any;
  isSubmitting: boolean = false;
  user:any;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder,private router:Router, private authService:AuthService) {}

  ngOnInit(): void {
    let storedUser = localStorage.getItem('vertexcmsuser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.user.name=this.user.name.split(' ')[0];
      console.log(this.user.name);
    }
    // Create the form with form controls
    this.userForm = this.fb.group({
      name: ['',],
      email: ['', Validators.email],
      photo: [null]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    const formData = new FormData();
    console.log(this.userForm.value);
    
    if (this.userForm.get('name')?.value) {
      formData.append('name', this.userForm.get('name')?.value);
    }
    
    if (this.userForm.get('email')?.value) {
      formData.append('email', this.userForm.get('email')?.value);
    }
    
    if (this.userForm.get('photo')?.value) {
      formData.append('photo', this.userForm.get('photo')?.value);
    }
    
   this.updateUser(formData);
  
  }

  updateUser(data:any): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
    this.subscription=  this.authService.updateUser('updateMe',data).subscribe(
        (user: any) => {
          let  {_id,name,email,role,photo}=user.data.user;
          let newUser={id:_id,email,role,photo,name};
          localStorage.setItem('vertexcmsuser', JSON.stringify(newUser));
          this.isSubmitting = false;
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
      
          // Start a new timeout
          this.timeoutId = setTimeout(() => {
            this.authService.updateUserStatus(newUser);
            this.router.navigate(['/dashboard']);
          }, 100);
          this.openSnackBar(
            'Profile updated successfully 🎉',
            'Close',
            'success-snackbar'
          );
          
        },
        (error: any) => {
          this.isSubmitting = false;
          console.log(error)
          if (error?.error?.message) {
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


  // Method to handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.userForm.patchValue({
      photo: file
    });
  }
  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${type}`],
    });
  }
  navigation(){
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

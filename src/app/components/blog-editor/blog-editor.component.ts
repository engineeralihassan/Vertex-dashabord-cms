import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MceEditorComponent } from '../mce-editor/mce-editor.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import {AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogsService } from 'src/app/services/blogs.service';





@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MceEditorComponent,MatTabsModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatSelectModule,FormsModule,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogEditorComponent {
  @ViewChild(MceEditorComponent) childComponent!: MceEditorComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('closeModelBtn') buttonRef!: ElementRef<HTMLButtonElement>;
  closeMode:boolean=false;
  subscription!:Subscription;
  private timeoutId:any;
  userForm!: FormGroup;
  isSubmitting: boolean = false;
  private _snackBar = inject(MatSnackBar);
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private blogService:BlogsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }


  receiveValueFromChild(value: string) {
    console.log('Value received from child:', value);
    this.userForm.patchValue({
      content: value
    });
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${type}`],
    });
  }


  createForm(): void {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      thubmnailPhoto: ['', Validators.required],
      featurePhoto: ['', Validators.required],
      ctaTitle: ['', Validators.required],
      ctaBtn: ['', Validators.required],
      ctaUrl: ['', Validators.required],
      author: ['', Validators.required],
      content: ['',],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onFileChange(event: any,feild:any) {
    const file = event.target.files[0];
    if(feild === 'thumbnail'){
      this.userForm.patchValue({
        thubmnailPhoto: file
      });
    }else{
      this.userForm.patchValue({
        featurePhoto: file
      });
    }
   
 
  }


  createBlogData(){
      // Create a FormData object
      let user = localStorage.getItem('vertexcmsuser') ? JSON.parse(localStorage.getItem('vertexcmsuser')!) : null;
  console.log(user);
  const formData = new FormData();

  // Append form fields to FormData object
  formData.append('title', this.userForm.get('title')?.value);
  formData.append('description', this.userForm.get('description')?.value);
  formData.append('category', this.userForm.get('category')?.value);

  // Handle file uploads separately, assuming they are files
  const thumbnailPhoto = this.userForm.get('thubmnailPhoto')?.value;
  const featurePhoto = this.userForm.get('featurePhoto')?.value;

  formData.append('thubmnailPhoto', thumbnailPhoto ? thumbnailPhoto : '');
  formData.append('featurePhoto', featurePhoto ? featurePhoto : '');

  // Append CTA data (nested object)
  formData.append('ctaData[title]', this.userForm.get('ctaTitle')?.value);
  formData.append('ctaData[btnText]', this.userForm.get('ctaBtn')?.value);
  formData.append('ctaData[url]', this.userForm.get('ctaUrl')?.value);

  // Append author and content
  formData.append('author', this.userForm.get('author')?.value);
  formData.append('user', user?.id);
  formData.append('content', this.userForm.get('content')?.value || '');

  return formData;
  }

  createBlog(): void {
  
      this.isSubmitting = true;
      console.log("FormData",this.createBlogData());
    this.subscription=  this.blogService.createBlog(this.createBlogData()).subscribe(
        (user: any) => {
          this.isSubmitting = false;
         
          this.openSnackBar(
            'Blog created successfully',
            'Close',
            'success-snackbar'
          );
         setTimeout(()=>{
       
          if (this.buttonRef) {
            this.buttonRef?.nativeElement?.click();
          }
         },100)
          
        },
        (error: any) => {
          console.log("Error",error);
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

  login() {
    this.router.navigate(['/dashboard']);
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  



}



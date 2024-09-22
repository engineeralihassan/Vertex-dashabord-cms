import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MceEditorComponent } from '../mce-editor/mce-editor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { CareersService } from 'src/app/services/careers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jod-editor',
  templateUrl: './jod-editor.component.html',
  styleUrls: ['./jod-editor.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MceEditorComponent,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JodEditorComponent {
  @ViewChild(MceEditorComponent) childComponent!: MceEditorComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('closeModelBtn') buttonRef!: ElementRef<HTMLButtonElement>;
  @Input() data: any;
  @Input() isEdit: any;
  closeMode: boolean = false;
  subscription!: Subscription;
  private timeoutId: any;
  userForm!: FormGroup;
  isSubmitting: boolean = false;
  jobId: any;
  private _snackBar = inject(MatSnackBar);
  content: any = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private careerService: CareersService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      setTimeout(() => {
        this.patchFormValues(this.data);
      }, 200);
    }
  }

  patchFormValues(formObject: any) {
    this.userForm.patchValue({
      title: formObject.title,
      category: formObject.category,
      level: formObject.level,
      type: formObject.type,
      technology: formObject.technology,
      country: formObject.country,
      state: formObject.state,
      city: formObject.city,
      address: formObject.address,
      content: formObject.content,
    });
    this.content = formObject.content;
    this.jobId = formObject.jobId;
  }

  receiveValueFromChild(value: string) {
    console.log('Value received from child:', value);
    this.userForm.patchValue({
      content: value,
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
      level: ['', Validators.required],
      type: ['', Validators.required],
      technology: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: [''],
      content: [''],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onFileChange(event: any, feild: any) {
    const file = event.target.files[0];
    if (feild === 'thumbnail') {
      this.userForm.patchValue({
        thubmnailPhoto: file,
      });
    } else {
      this.userForm.patchValue({
        featurePhoto: file,
      });
    }
  }

  createJobData() {
    const formData = this.userForm.value;

    const jobData = {
      title: formData.title,
      filters: {
        state: formData.state,
        city: formData.city,
        country: formData.country,
        technology: formData.technology,
        category: formData.category,
        type: formData.type,
        level: formData.level,
      },
      jobDetail: formData.content,
    };

    return jobData;
  }

  createBlog(): void {
    this.isSubmitting = true;
    console.log('FormData', this.createJobData());
    this.subscription = this.careerService
      .createJob(this.createJobData())
      .subscribe(
        (user: any) => {
          this.isSubmitting = false;

          this.openSnackBar(
            'Job created successfully',
            'Close',
            'success-snackbar'
          );
          setTimeout(() => {
            if (this.buttonRef) {
              this.buttonRef?.nativeElement?.click();
            }
          }, 100);
        },
        (error: any) => {
          console.log('Error', error);
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

  updateJob(): void {
    this.isSubmitting = true;
    this.subscription = this.careerService
      .updateJob(`/${this.jobId}`, this.createJobData())
      .subscribe(
        (user: any) => {
          this.isSubmitting = false;

          this.openSnackBar(
            'Job updated successfully',
            'Close',
            'success-snackbar'
          );
          setTimeout(() => {
            this.router.navigate(['/careers']);
          }, 100);
        },
        (error: any) => {
          console.log('Error', error);
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

  navigation() {
    this.router.navigate(['/careers']);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

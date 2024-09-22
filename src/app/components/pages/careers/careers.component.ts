
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import {ChangeDetectionStrategy, Component, inject, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { BlogEditorComponent } from '../../blog-editor/blog-editor.component';
import {AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BlogsService } from 'src/app/services/blogs.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { TruncateWordsPipe } from 'src/app/services/truncate.pipe';
import { formatDateAccordingToTimeZone } from 'src/app/utils/dateFormate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestsService } from 'src/app/services/requests.service';
import { CareersService } from 'src/app/services/careers.service';
import { JodEditorComponent } from '../../jod-editor/jod-editor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  standalone:true,
  imports: [DemoFlexyModule, MatButtonModule, MatTooltipModule, MatIconModule,MatDialogModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule,LoaderComponent,TruncateWordsPipe],
})
export class CareersComponent {
  url=environment.docsUrl;
  displayedColumns: string[] = [ 'date','title', 'address','status','actions'];
  dataSource!: MatTableDataSource<any>;
  isLoading:boolean=true;
  
  private _snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly dialog = inject(MatDialog);
  constructor(private blogsService:BlogsService,private dataService:CareersService, private router:Router) {


  }

  getAllJobs(){
    this.dataService.getAllJobs().subscribe((data:any)=>{
      this.dataSource= new MatTableDataSource(data?.data?.jobs);
      this.isLoading=false;
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },100)
    })
  }

  ngOnInit(){
this.getAllJobs();
  }

  onSelectChange(event: Event,row:any): void {
    const value = (event.target as HTMLSelectElement).value;
    this.dataService.updateJob(`/${row._id}`,{status:value}).subscribe((data:any)=>{
        this.openSnackBar("Status updated successfully",'close','success-snackbar');
        this.updateStatus(row,value);
    })
    // this.updateStatus(row,value);
  }

  deleteJob(id:any){
    let confirmation= confirm("Are you really want to delete this job");
    if(confirmation){
      this.dataService.deleteJob(`/${id}`).subscribe((job:any)=>{
        this.dataSource.data = this.dataSource.data.filter((row) => row._id !== id);
        this.openSnackBar("Job Deleted Successfully",'close','success-snackbar');
      })
    }
  }

  togglePublish(row:any,rowIndex:any){
    let confirmation ;
    if(row.published){
    confirmation=  confirm("Are you really want to un-publish this job");
    if(confirmation){
      this.dataService.updateJob(`/${row._id}`,{published:false}).subscribe((job:any)=>{
      
     this.dataSource.data[rowIndex].published = false;
        this.openSnackBar("Job Un Published Successfully",'close','success-snackbar');
      })
   
    }

    }
    else{
      confirmation=  confirm("Are you really want to publish this job");
      if(confirmation){
        this.dataService.updateJob(`/${row._id}`,{published:true}).subscribe((job:any)=>{
          this.dataSource.data[rowIndex].published = true;
          this.openSnackBar("Job Published Successfully",'close','success-snackbar');
           })
    
      }
    }
  }

  updateStatus(row: any, newStatus: string) {
    // Find the index of the row you want to update
    const rowIndex = this.dataSource.data.findIndex(data => data === row);

    if (rowIndex !== -1) {
      // Update the status of the specific row
      this.dataSource.data[rowIndex].status = newStatus;

      // Trigger table refresh
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    }
  }
  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${type}`],
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(JodEditorComponent );
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading=true;
      this.getAllJobs();
    });
  }

  navigation(link:any,id:any){
    this.router.navigate([`/${link}/${id}`]);
  }

  formatDate(createdAt: string): string {
    return formatDateAccordingToTimeZone(createdAt);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

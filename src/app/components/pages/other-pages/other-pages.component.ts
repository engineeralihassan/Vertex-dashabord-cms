import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { Component, inject, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { BlogEditorComponent } from '../../blog-editor/blog-editor.component';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RequestsService } from 'src/app/services/requests.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  standalone:true,
  imports: [DemoFlexyModule, MatButtonModule, MatTooltipModule, MatIconModule,MatDialogModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule],
  selector: 'app-other-pages',
  templateUrl: './other-pages.component.html',
  styleUrls: ['./other-pages.component.scss']
})
export class OtherPagesComponent{
  url:string=environment.docsUrl;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly dialog = inject(MatDialog);
  table:string='';
  isLoading=true;
  private _snackBar = inject(MatSnackBar);
  constructor(private dataService:RequestsService,private route:ActivatedRoute, private blogsService:BlogsService) {
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.isLoading=true;
      console.log("We are in the page calling 1");
      this.table = params['table'];  // 'dynamicText' is the name of the route parameter
      console.log('Dynamic part of the route:', this.table);
      if(this.table==='contactus-request'){
        this.displayedColumns=['date','name', 'email', 'services', 'status','actions'];
      }else if( this.table==='job-request'){
        this.displayedColumns=['name','email', 'linkedIn', 'resume', 'status','actions'];
      }
      else if( this.table==='training-request'){
        this.displayedColumns=['name','email', 'linkedIn', 'resume','coverLetter', 'status','actions'];
      }
      else if( this.table==='bolg-subscriptions'){
        this.displayedColumns=['id','email', 'active', 'actions'];
      }
      if(this.table==='bolg-subscriptions'){
                 this.blogsService.getAllblogSubscriptions('/subscriptions').subscribe((data:any)=>{
                  this.dataSource= new MatTableDataSource(data?.data?.subscriptions);
                  this.isLoading=false;
                  console.log("Ths sit the data", data?.data?.subscriptions)
                 }) 
      }
      else{
     this.dataService.getSubmissions(this.table).subscribe((data:any)=>{
      console.log("requests",data.data.requests);
      if(this.table==='contactus-request'){
        this.dataSource= new MatTableDataSource(data.data.requests);
      }
      if(this.table==='job-request'){
        this.dataSource= new MatTableDataSource(data.data.jobs);
      }
      if(this.table==='training-request'){
        this.dataSource= new MatTableDataSource(data.data.applications);
      }
      
      this.isLoading=false;
      setTimeout(()=>{
        console.log("We are in the page calling 2");
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },300)
     })
    }
    });

  }
  openDialog() {
    const dialogRef = this.dialog.open(BlogEditorComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSelectChange(event: Event,row:any): void {
    const value = (event.target as HTMLSelectElement).value;
    this.dataService.updateRequest(this.table,{id:row._id,status:value}).subscribe((data:any)=>{
        this.openSnackBar("Status updated successfully",'close','success-snackbar');
        this.updateStatus(row,value);
    })
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

   formatDate(dateString:any) {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    let minutes:any = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${hours}:${minutes} ${ampm} ${month}/${day}/${year}`;
  }
}






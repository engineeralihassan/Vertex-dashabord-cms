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

@Component({
  standalone:true,
  imports: [DemoFlexyModule, MatButtonModule, MatTooltipModule, MatIconModule,MatDialogModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule],
  selector: 'app-other-pages',
  templateUrl: './other-pages.component.html',
  styleUrls: ['./other-pages.component.scss']
})
export class OtherPagesComponent{
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly dialog = inject(MatDialog);
  table:string='';
  isLoading=true;
  constructor(private dataService:RequestsService,private route:ActivatedRoute) {
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






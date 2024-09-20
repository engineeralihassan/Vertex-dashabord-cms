
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


@Component({
  selector: 'app-blogs',
  standalone:true,
  imports: [DemoFlexyModule, MatButtonModule, MatTooltipModule, MatIconModule,MatDialogModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule,LoaderComponent,TruncateWordsPipe],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
  url=environment.docsUrl;
  displayedColumns: string[] = ['img', 'title', 'description','author','actions'];
  dataSource!: MatTableDataSource<any>;
  isLoading:boolean=true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly dialog = inject(MatDialog);
  constructor(private blogsService:BlogsService) {
this.getAllBlogs();

  }

  getAllBlogs(){
    this.blogsService.getAllblogs().subscribe((data:any)=>{
      this.dataSource= new MatTableDataSource(data?.data?.blogs);
      this.isLoading=false;
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },100)
    })
  }

  ngOnInit(){

  }
  openDialog() {
    const dialogRef = this.dialog.open(BlogEditorComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading=true;
      this.getAllBlogs();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



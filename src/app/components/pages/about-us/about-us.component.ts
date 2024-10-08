import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import {AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MceEditorComponent } from '../../mce-editor/mce-editor.component';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
export interface UserData {
  img: string;
  year: string;
  description: string;
}
/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  imports: [MatDialogModule, MatButtonModule,MatTabsModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatSelectModule,DemoFlexyModule,MatExpansionModule,CommonModule],
  standalone:true,
})
export class AboutUsComponent {
  @ViewChild(MceEditorComponent) childComponent!: MceEditorComponent;
  displayedColumns: string[] = ['img', 'year', 'description','actions'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  closeMode:boolean=false;
  isShowForm:boolean=false;
  private _snackBar = inject(MatSnackBar);
  constructor() {
    // Create 100 users
    const users = Array.from({length:6}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
toggleForm(){
  this.isShowForm=!this.isShowForm;
}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      panelClass: ['success-snackbar'], 
    });
  }
  getContentFromChild() {
    const content = this.childComponent.saveContent();
    console.log("Received content from child: ", content);
    // Do something with the content data
    this.openSnackBar("Blog saved successfully","Done")
    setTimeout(()=>{
      this.closeMode=true;
      // this._snackBar.dismiss();
    },2000)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';
let year=2018+1;
  return {
    img: 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
    year: year.toString(),
    description: Math.round(Math.random() * 100).toString()+FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]+"Unique description text",
  };
}


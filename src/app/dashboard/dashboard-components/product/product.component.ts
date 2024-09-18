import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
  photo: string;
  role:string
}




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id','photo', 'name', 'email', 'role'];
  dataSource:any;
  isLoading:boolean=true;
  mediaUrl=environment.userMediaUrl;
  constructor(private authService:AuthService ) { }

  ngOnInit(): void {
    this.authService.getAllUsers('/all-users').subscribe((data:any)=>{
      this.dataSource= new MatTableDataSource(data.data.users);
      this.isLoading=false;
      console.log(this.dataSource);
    })
  }

}

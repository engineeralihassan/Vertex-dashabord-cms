import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
  photo: string;
  department:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, photo:'', name: 'Tayyab junaid', department: 'Quality assurance', email: 'ali.hassan@vertexitsol.com' },
  { id: 2, photo:'', name: 'Saad Qaisar',   department: 'Devloper', email: 'ali.hassan@vertexitsol.com' },
  { id: 3, photo:'', name: 'Ummer Huzaifa', department: 'Sales ', email: 'ali.hassan@vertexitsol.com' },
  { id: 4, photo:'', name: 'Ali Hassan', department: 'Devloper', email: 'ali.hassan@vertexitsol.com' },
  { id: 5, photo:'', name: 'Rabia Saeed', department: 'Product Manager', email: 'ali.hassan@vertexitsol.com' },
  { id: 6, photo:'', name: 'Kabhisha Anwar', department: 'Digital Markeeting', email: 'ali.hassan@vertexitsol.com' },
  { id: 7, photo:'', name: 'Saad ahmad', department: 'Digital Markeeting', email: 'ali.hassan@vertexitsol.com' },
  { id: 8, photo:'', name: 'Shahrukh Javed', department: 'Digital Markeeting', email: 'ali.hassan@vertexitsol.com' },
  { id: 9, photo:'', name: 'Amna Azam', department: 'Product Manager', email: 'ali.hassan@vertexitsol.com' },

];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id','photo', 'name', 'email', 'department'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

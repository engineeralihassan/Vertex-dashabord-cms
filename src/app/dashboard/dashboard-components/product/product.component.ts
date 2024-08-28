import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
  company: string;
  services: string;
  help: string;
  status:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Deep Javiya', services: 'Frontend Devloper', company: 'Flexy Angular', status: 'Low', help: 'badge-info', email: '$3.9k' },
  { id: 2, name: 'Nirav Joshi', services: 'Project Manager', company: 'Hosting Press HTML', status: 'Medium', help: 'badge-primary', email: '$24.5k' },
  { id: 3, name: 'Sunil Joshi', services: 'Web Designer', company: 'Elite Admin', status: 'High', help: 'badge-danger', email: '$12.8k' },
  { id: 4, name: 'Maruti Makwana', services: 'Backend Devloper', company: 'Material Pro', status: 'Critical', help: 'badge-success', email: '$2.4k' },
];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'company', 'services','status'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

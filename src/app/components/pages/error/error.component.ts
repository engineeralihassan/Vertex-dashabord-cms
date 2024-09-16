import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule]
})
export class ErrorComponent {
  constructor(private location:Location){}
goBack(){
this.location.back();
}
}

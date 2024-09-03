import { Component } from '@angular/core';
import { Truck } from 'angular-feather/icons';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[MatSelectModule,MatFormFieldModule,MatInputModule,CommonModule,MatButtonModule]
})
export class ProfileComponent {

}

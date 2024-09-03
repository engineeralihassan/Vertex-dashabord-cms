import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone:true,
  imports:[MatProgressSpinnerModule,DemoFlexyModule]
})
export class LoaderComponent {

}

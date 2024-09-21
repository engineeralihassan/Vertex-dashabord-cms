import { Component, inject } from '@angular/core';
import { MceEditorComponent } from '../../mce-editor/mce-editor.component';
import {MatButtonModule} from '@angular/material/button';
import { LegalService } from 'src/app/services/legal.service';
import { LoaderComponent } from '../../loader/loader.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone:true,
  imports:[MceEditorComponent,MatButtonModule,LoaderComponent,CommonModule]
})
export class PrivacyPolicyComponent {
  privacyData:any;
  isLaoding:boolean=true;
  private _snackBar = inject(MatSnackBar);
  constructor(private legalService:LegalService, private router:Router){}
  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${type}`],
    });
  }
  ngOnInit(){
    this.legalService.getData().subscribe((data:any)=>{
      this.isLaoding=false;
      this.privacyData=data?.data?.data?.privacyPolicy.content;
    })
  } 
   receiveValueFromChild(value: string) {
    console.log('Value received from child:', value);
   let  data= {
    privacyPolicy:{
      content: value
    }
           
   }   
    this.legalService.updateData(data).subscribe((data:any)=>{
      this.privacyData=data?.data?.data?.privacyPolicy.content;
      this.router.navigate(['/dashboard'])
      this.openSnackBar("Data is updated Successfully","close",'success-snackbar');
    })
  }
}

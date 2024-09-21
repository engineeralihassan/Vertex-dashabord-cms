import { Component, inject } from '@angular/core';
import { MceEditorComponent } from '../../mce-editor/mce-editor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LegalService } from 'src/app/services/legal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-terms-condtions',
  templateUrl: './terms-condtions.component.html',
  styleUrls: ['./terms-condtions.component.scss'],
  standalone:true,
  imports:[MceEditorComponent,CommonModule,LoaderComponent]
})
export class TermsCondtionsComponent {
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
      this.privacyData=data?.data?.data?.termsAndConditions.content;
    })
  } 
   receiveValueFromChild(value: string) {
    console.log('Value received from child:', value);
   let  data= {
    termsAndConditions:{
      content: value
    }
           
   }   
    this.legalService.updateData(data).subscribe((data:any)=>{
      this.privacyData=data?.data?.data?.termsAndConditions?.content;
      this.router.navigate(['/dashboard'])
      this.openSnackBar("Data is updated Successfully","close",'success-snackbar');
    })
  }
}

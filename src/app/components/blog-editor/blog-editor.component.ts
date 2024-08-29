import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MceEditorComponent } from '../mce-editor/mce-editor.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MceEditorComponent,MatTabsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogEditorComponent {
  @ViewChild(MceEditorComponent) childComponent!: MceEditorComponent;
  closeMode:boolean=false;
  private _snackBar = inject(MatSnackBar);

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
}

import { Component } from '@angular/core';
import { MceEditorComponent } from '../../mce-editor/mce-editor.component';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone:true,
  imports:[MceEditorComponent,MatButtonModule]
})
export class PrivacyPolicyComponent {

}

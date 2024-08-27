import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-mce-editor',
  templateUrl: './mce-editor.component.html',
  styleUrls: ['./mce-editor.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MceEditorComponent {
  content: string = '';
  saveContent() {
    console.log(this.content);
  }
}

import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
@Component({
  selector: 'app-mce-editor',
  templateUrl: './mce-editor.component.html',
  styleUrls: ['./mce-editor.component.scss'],
  standalone:true,
  imports:[EditorModule,FormsModule],
  encapsulation:ViewEncapsulation.None
})
export class MceEditorComponent {
  @Output() onContentChange= new EventEmitter<any>();
  content: string = '';
  saveContent() {
    return this.content;
  }
}

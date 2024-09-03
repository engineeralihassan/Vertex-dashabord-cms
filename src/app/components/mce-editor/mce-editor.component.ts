import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
@Component({
  selector: 'app-mce-editor',
  templateUrl: './mce-editor.component.html',
  styleUrls: ['./mce-editor.component.scss'],
  standalone:true,
  imports:[EditorModule,FormsModule,MatButtonModule,CommonModule,MatProgressSpinnerModule,DemoFlexyModule],
  encapsulation:ViewEncapsulation.None
})
export class MceEditorComponent {
  @Output() onContentChange= new EventEmitter<any>();
  isLoading:boolean=true;
  content: string = '';
  saveContent() {
    return this.content;
  }
  editorInit = {
    height: 500,
    menubar: true,
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown textcolor colorpicker',
    toolbar: 'undo redo | blocks fontfamily fontsize styleselect fontselect | bold italic underline forecolor backcolor | link image media table mergetags textcolor color | addcomment showcomments | spellcheckdialog  | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    setup: (editor:any) => {
      editor.on('init', () => {
        console.log("calllllllll")
        this.handleEditorInit();
      });
    }
  };

  constructor() { }

  ngOnInit(): void {}
  ngAfterViewInit(){    
  }

  handleEditorInit() {
    console.log("The loading is becoming false");
    this.isLoading = false;
  }
}

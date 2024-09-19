import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-mce-editor',
  templateUrl: './mce-editor.component.html',
  styleUrls: ['./mce-editor.component.scss'],
  standalone:true,
  imports:[EditorModule,FormsModule,MatButtonModule,CommonModule,MatProgressSpinnerModule,DemoFlexyModule,LoaderComponent,CommonModule],
  encapsulation:ViewEncapsulation.None
})
export class MceEditorComponent {
  @Output() onContentChange= new EventEmitter<any>();
  @Input() showBtn=true ;
  isLoading:boolean=true;
  content: string = '';

  editorInit = {
    height: 500,
    menubar: true,
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount  textcolor colorpicker',
    toolbar: 'undo redo | blocks fontfamily fontsize styleselect fontselect | bold italic underline forecolor backcolor | link imacdge media table mergetags textcolor color | addcomment showcomments | spellcheckdialog  | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    setup: (editor:any) => {
      editor.on('init', () => {
        console.log("This is loading status",this.isLoading);
        this.handleEditorInit();
      });
    }
  };

  constructor(private cdr:ChangeDetectorRef) { }
  saveContent() {
    this.onContentChange.emit(this.content);
  }

  ngOnInit(): void {}
  ngAfterViewInit(){    
  }

  handleEditorInit() {

      this.isLoading = false;
      this.cdr.detectChanges()


     
   
  }
}

import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-mce-editor',
  templateUrl: './mce-editor.component.html',
  styleUrls: ['./mce-editor.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    EditorModule, FormsModule, MatButtonModule, CommonModule,
    MatProgressSpinnerModule, DemoFlexyModule, LoaderComponent
  ]
})
export class MceEditorComponent {
  @Input() data!: string; // HTML content from parent
  @Output() onContentChange = new EventEmitter<string>(); // Emit changed content
  isLoading: boolean = true; // Loader flag
  content: string = ''; // Bound content for TinyMCE

  // Editor initialization config
  editorInit = {
    height: 500,
    menubar: true,
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount textcolor colorpicker',
    toolbar: 'undo redo | blocks fontfamily fontsize styleselect fontselect | bold italic underline forecolor backcolor | link image media table mergetags textcolor color | addcomment showcomments | spellcheckdialog | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    setup: (editor: any) => {
      editor.on('init', () => {
        this.handleEditorInit(); // Initialize content after editor is loaded
      });
    }
  };

  constructor(private cdr: ChangeDetectorRef) {}

  // Handle changes in @Input() property `data`
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.content = this.stripHtmlTags(this.data); // Strip HTML tags and bind plain text
    }
  }

  // Method to strip HTML tags and return plain text
  stripHtmlTags(content: string): string {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.textContent || div.innerText || ''; // Extract plain text
  }

  // Emit content whenever it changes
  saveContent() {
    this.onContentChange.emit(this.content);
  }

  // After the editor is fully initialized
  handleEditorInit() {
    this.isLoading = false;
    this.cdr.detectChanges(); // Detect changes to stop loader
  }
}

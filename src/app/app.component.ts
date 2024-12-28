import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CodeEditorComponent } from "./components/code-editor/code-editor.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CodeEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'online-code-editor';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextboxComponent } from './textbox/textbox.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CleanAuthApp';
}

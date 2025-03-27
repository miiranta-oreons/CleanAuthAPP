import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextboxComponent } from './textbox/textbox.component';
import { LoadingComponent } from "./loading/loading.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextboxComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CleanAuthApp';
}

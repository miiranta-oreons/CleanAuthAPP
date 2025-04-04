import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextboxComponent } from './components/textbox/textbox.component';
import { LoadingComponent } from "./components/loading/loading.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextboxComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CleanAuthApp';
}

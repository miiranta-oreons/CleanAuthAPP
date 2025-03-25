import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthContainerComponent } from './auth-container/auth-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CleanAuthApp';
}

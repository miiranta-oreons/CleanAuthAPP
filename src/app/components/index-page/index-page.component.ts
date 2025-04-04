import { Component } from '@angular/core';
import { AuthContainerComponent } from "./auth-container/auth-container.component";

@Component({
  selector: 'app-index-page',
  imports: [AuthContainerComponent],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.scss'
})
export class IndexPageComponent {

}

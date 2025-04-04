import { Component, inject, signal } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-logged-page',
  imports: [],
  templateUrl: './logged-page.component.html',
  styleUrl: './logged-page.component.scss'
})
export class LoggedPageComponent {
  private userDataService: UserDataService = inject(UserDataService);

  public userData = signal<string>('Not logged in ;(');

  constructor() {
    this.userDataService.fetchUserData().subscribe({
      next: (data) => {
        this.userData.set(data.message);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

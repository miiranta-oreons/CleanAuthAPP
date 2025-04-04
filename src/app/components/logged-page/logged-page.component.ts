import { Component, inject, signal } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-page',
  imports: [],
  templateUrl: './logged-page.component.html',
  styleUrl: './logged-page.component.scss'
})
export class LoggedPageComponent {
  private userDataService: UserDataService = inject(UserDataService);
  private authService: AuthService = inject(AuthService);
  private router = inject(Router);

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

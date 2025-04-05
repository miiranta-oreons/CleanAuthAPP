import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';

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

  public userData = signal<string>('loading...');
  
  constructor() {
   
    this.userDataService.fetchUserData().subscribe({
      next: (data) => {
        this.userData.set(data.message);
      },
      error: (err) => {
        //
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

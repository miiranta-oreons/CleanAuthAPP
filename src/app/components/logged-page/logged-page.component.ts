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

  public userAuthenticated = signal<string>('loading...');
  public userAdmin = signal<string>('loading...');
  
  constructor() {
   
    //
    this.userDataService.fetchUserData().subscribe({
      next: (data) => {
        this.userAuthenticated.set(data.message);
      },
      error: (err) => {
        this.userAuthenticated.set('You are NOT authenticated!');
      }
    });

    this.userDataService.fetchUserAdmin().subscribe({
      next: (data) => {
        this.userAdmin.set(data.message);
      },
      error: (err) => {
        this.userAdmin.set('You are NOT an admin!');
      }
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

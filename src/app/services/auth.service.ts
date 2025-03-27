import { inject, Injectable } from '@angular/core';
import { TextboxService } from './textbox.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private textboxService: TextboxService = inject(TextboxService);

  constructor() { }

  login(email: string, password: string): boolean {
    // Simulate a login process
    this.textboxService.openTextbox(['Login', 'email: ' + email, 'password: ' + password]);
    return true; // Simulate successful login
  }

  register(email: string, password: string, name: string, age: number): boolean {
    // Simulate a registration process
    this.textboxService.openTextbox(['Register', 'email: ' + email, 'password: ' + password, 'name: ' + name, 'age: ' + age]);
    return true; // Simulate successful registration
  }

  logout(): boolean {
    // Simulate a logout process
    this.textboxService.openTextbox(['Logout', 'You have been logged out successfully']);
    return true; // Simulate successful logout
  }
  
}

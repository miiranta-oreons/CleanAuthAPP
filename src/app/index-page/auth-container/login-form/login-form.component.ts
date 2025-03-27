import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; 
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule], 
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private authService: AuthService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  submitLoginForm() {
    this.authService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.password ?? ''
    );
  }
}

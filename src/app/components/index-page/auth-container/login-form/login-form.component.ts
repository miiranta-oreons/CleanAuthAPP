import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; 
import { AuthService } from '../../../../services/auth.service';
import { LoginRequest } from '../../../../models/login-request';

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
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.authService.login(loginRequest);
  }
}

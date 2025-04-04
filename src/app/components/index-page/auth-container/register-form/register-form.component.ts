import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; 
import { AuthService } from '../../../../services/auth.service';
import { TextboxService } from '../../../../services/textbox.service';
import { RegisterRequest } from '../../../../models/register-request';


@Component({
  selector: 'app-register-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule], 
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  private authService: AuthService = inject(AuthService);
  private textBoxService: TextboxService = inject(TextboxService);

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl('')
  });

  submitRegisterForm() {

    // Check if passwords match
    if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
      this.textBoxService.openWarningbox(['Passwords do not match!']);
      return;
    }

    const registerRequest: RegisterRequest = {
      name: this.registerForm.value.name ?? '',
      age: Number(this.registerForm.value.age) || 0,
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? ''
    };

    this.authService.register(registerRequest);
  }

}

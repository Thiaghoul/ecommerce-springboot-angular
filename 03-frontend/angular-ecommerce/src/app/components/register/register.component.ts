import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),

    })
  }

  onRegister(): void {
    if(this.registerForm.invalid){
      return;
    }

    const data = this.registerForm.value;

    this.authService.register(data).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'Email already exists';
        }else{
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }

}

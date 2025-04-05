import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  standalone: false,
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
        if (isLoggedIn) {
          const user = this.authService.getUserFromToken();
          this.userName = user.firstName;
        } else {
          this.userName = '';
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

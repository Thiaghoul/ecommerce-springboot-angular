import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  standalone: false,
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit{
  
  isAuthenticated: boolean = false;
  userName: string = '';  
  
  constructor(){

  }
  
  ngOnInit(): void {

  }

  getUserDetails(){
    if (this.isAuthenticated){

    }
  }

  logout(){

  }
}

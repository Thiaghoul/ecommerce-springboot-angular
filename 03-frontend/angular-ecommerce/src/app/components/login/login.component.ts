import { Component, Inject, OnInit } from '@angular/core';
import myAppConfig from '../../config/my-app-config';
import { OktaAuthModule, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth, pkce } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  oktaSignin : any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientid,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
  }

}

import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import myAppConfig from '../../config/my-app-config';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  oktaSignin: any;

  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const { default: OktaSignIn } = await import('@okta/okta-signin-widget');

      this.oktaSignin = new OktaSignIn({
        logo: 'assets/images/logo.png',
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authParams: {
          pkce: true,
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        }
      });

      this.oktaSignin.remove();

      this.oktaSignin.renderEl(
        { el: '#okta-sign-in-widget' },
        (response: any) => {
          if (response.status === 'SUCCESS') {
            this.oktaAuth.signInWithRedirect();
          }
        },
        (error: any) => {
          console.error('Erro ao renderizar Okta:', error);
        }
      );
    }
  }
}

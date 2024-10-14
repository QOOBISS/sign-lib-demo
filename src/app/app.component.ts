import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sign-demo';

  config: InputConfig = {
    AppDataId: '1dd661cd-b2dc-4820-be99-6d2ac71bdc42',
    StepId: '3d12ab9e-9209-4437-9325-6d69bfb2dcc6',
    Token: '',
    BaseUrl: 'http://10.9.1.1:5580',
  };

  constructor() {
    this.getToken();
  }

  event(event: any) {
    console.log('EVENT: ' + event);
  }

  getToken() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('client_id', 'backoffice');
    params.append('client_secret', 'myClientSecret');
    params.append('grant_type', 'password');
    params.append('username', 'AdminUser');
    params.append('password', '123Asd!@#');
    params.append('scope', 'apiName  offline_access');

    fetch('http://10.9.1.1:5580/connect/token', {
      method: 'POST',
      headers: headers,
      body: params,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        this.config.Token = JSON.parse(result).access_token;
      })
      .catch((error) => console.error(error));
  }
}

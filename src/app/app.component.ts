import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public oidcSecurityService: OidcSecurityService,
    public http: HttpClient) {
  }

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((auth) => console.log('is authenticated', auth));
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    let isAuth: boolean;
    this.oidcSecurityService.checkAuth().subscribe(value => {
      isAuth = value;
    });
    if (isAuth) {
      this.oidcSecurityService.logoff();
    }
  }


  callApi(): void {
    const token = this.oidcSecurityService.getToken();

    this.http.get('http://localhost:5000/Organization/TestOk', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    })
      .subscribe((data: any) => {
        console.log('api result:', data);
      });
  }
}

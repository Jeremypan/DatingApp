import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// baseUrl
baseUrl = 'http://localhost:5000/api/auth/';
jwtHepler = new JwtHelperService();
decodedToken: any;

constructor(private http: HttpClient) { }

  login(model: any) {

    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            // localStorage token
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHepler.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      );

  }

  register(model: any) {
    return this.http.post( this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHepler.isTokenExpired(token);
  }
}

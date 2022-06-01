import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiHttpInterceptor } from '../http/api-httpinterceptor';
import { User } from '../redux/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiLogin: string = '/api/login'; // POST PARAMS=(username, password)
  urlApiRegister: string = '/api/register'; // POST PARAMS=(email, password, first_name, last_name, login)

  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient) {
    let user: User = JSON.parse(localStorage.getItem('currentUser')!);
    ApiHttpInterceptor.jwtToken = JSON.parse(localStorage.getItem('jwttoken')!);
    if (user == null || user.expiration_time < Math.floor(Date.now() / 1000)) {
      this.currentUserSubject = new BehaviorSubject<User>(null!);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('jwttoken');
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(user);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwttoken');
    this.currentUserSubject.next(null!);
  }

  public postLogin(username: string, password: string): Observable<User> {
    let data: string = 'username=' + username + '&password=' + password;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    return this.http.post<User>(this.urlApiLogin, data, httpOptions).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(
          'jwttoken',
          JSON.stringify(ApiHttpInterceptor.jwtToken)
        );
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  public postRegister(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    username: string
  ): Observable<User> {
    let data: string =
      'username=' +
      username +
      '&password=' +
      password +
      '&first_name=' +
      first_name +
      '&last_name=' +
      last_name +
      '&email=' +
      email;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    return this.http.post<User>(this.urlApiRegister, data, httpOptions);
  }
}

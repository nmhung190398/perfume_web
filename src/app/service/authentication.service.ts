import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CART_ITEM, SERVER_API_URL, USER_LOGIN} from '../app.constants';
import {AuthModel} from "../model/auth.model";
import {CartService} from "./cart.service";


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AuthModel>;
  public currentUser: Observable<AuthModel>;

  constructor(private http: HttpClient,private cartService: CartService) {
    this.currentUserSubject = new BehaviorSubject<AuthModel>(JSON.parse(localStorage.getItem(USER_LOGIN)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthModel {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`${SERVER_API_URL}/login`, {username, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user);
        localStorage.setItem(USER_LOGIN, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem(USER_LOGIN);
    this.currentUserSubject.next(null);
    this.cartService.removeCartItem();
  }
}

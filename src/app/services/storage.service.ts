import { Injectable } from '@angular/core';
import { AuthService } from './http/auth.service';
import { LoggedUser } from '../model/auth.model';
const USER_KEY = 'logged-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private authService: AuthService) { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: LoggedUser): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as LoggedUser;
    }

    return new LoggedUser();
  }



  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}

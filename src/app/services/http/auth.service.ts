import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthRequest, AuthCreateRequest, LoggedUser, Pagination, User, UserList } from '../../model/auth.model';
import * as Constants from '../../model/app.constant';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  setupRegisteration(register: AuthCreateRequest) {
    return this.http.post(Constants.API_ENDPOINT.concat(Constants.SETUP_USER), register);
  }

  createUser(register: AuthCreateRequest) {
    return this.http.post(Constants.API_ENDPOINT.concat(Constants.CREATE_USER), register, { withCredentials: true });
  }

  getUsers(pagination: Pagination){
    const params = new HttpParams({ fromObject: { ...pagination } });
    return this.http.get<UserList>(Constants.API_ENDPOINT.concat(Constants.CREATE_USER), { params: params, withCredentials: true });
  }

  loginService(loginRequest: AuthRequest) {
    return this.http.post<LoggedUser>(Constants.API_ENDPOINT.concat(Constants.SIGNIN), loginRequest, { withCredentials: true });
  }

  logOut() {
    return this.http.post(Constants.API_ENDPOINT.concat(Constants.SIGNOUT), { withCredentials: true });
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from "../../model/app.constant";
import { Pagination, Privilege, PrivilegeList, Role, RoleList } from 'src/app/model/auth.model';
@Injectable({
  providedIn: 'root'
})
export class RolePrivilegeService {

  constructor(private http: HttpClient) { }

  createRole(role: Role) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<Role>(Constants.API_ENDPOINT.concat(Constants.ROLE), role, { withCredentials: true });
  }

  createPrivileges(privilege: Privilege) {
    return this.http.post<Privilege>(Constants.API_ENDPOINT.concat(Constants.PRIVILEGE), privilege, { withCredentials: true });
  }

  allPrivileges(pagination: Pagination) {
    const params = new HttpParams({ fromObject: { ...pagination } });
    return this.http.get<PrivilegeList>(Constants.API_ENDPOINT.concat(Constants.PRIVILEGE), { params: params, withCredentials: true });
  }

  privilegeNames() {
    return this.http.get<string[]>(Constants.API_ENDPOINT.concat(Constants.PRIVILEGE_NAMES), { withCredentials: true });
  }

  getRoles(pagination: Pagination) {
    const params = new HttpParams({ fromObject: { ...pagination } });
    return this.http.get<RoleList>(Constants.API_ENDPOINT.concat(Constants.ROLE), { params: params, withCredentials: true });
  }

  allRoleNames(){
    return this.http.get<string[]>(Constants.API_ENDPOINT.concat(Constants.ROLE_NAMES), { withCredentials: true });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthCreateRequest, Pagable, Pagination, Role, User } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/services/http/auth.service';
import { RolePrivilegeService } from 'src/app/services/http/roles-privileges.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, Pagable {
  errorMessage!: string;
  userValidated: boolean = false;
  register: AuthCreateRequest = new AuthCreateRequest();
  roleNameList: string[] = [];
  userList: User[] = [];
  constructor(private userService: AuthService, private roleService: RolePrivilegeService) { 
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }
  pagingConfig: Pagable = {} as Pagable;
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  tableSize: number[] = [5, 10, 15, 20, 50, 100];
  pagination: Pagination = new Pagination();
  sorting: boolean = false;
  visible: boolean = false;
  position = 'bottom-end';
  percentage = 0;

  ngOnInit(): void {
    this.getAllRoleNames();
    this.getUsers();
  }

  getAllRoleNames() {
    this.roleService.allRoleNames().subscribe({
      next: (response) => {
        response.forEach(role => {
          this.roleNameList.push(role);
        })
      },
      error: () => { }
    })
  }

  getUsers() {
    this.userService.getUsers(this.pagination).subscribe({
      next: (response) => {
        this.userList = response.rows;
        this.pagingConfig.totalItems = response.totalCount;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getUsers();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 0;
    this.getUsers();
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  onSubmit() {
    this.register.firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    this.register.lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
    this.register.userName = (<HTMLInputElement>document.getElementById('userName')).value;
    this.register.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.register.role = new Role();
    this.register.role.roleName = (<HTMLInputElement>document.getElementById('roleName')).value;
    this.userValidated = true;
    this.register.password = 'INITIAL';
    if (this.validateRegister()) {
      this.userService.createUser(this.register).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  validateRegister() {
    if (this.register.firstName == '' || this.register.firstName.trim().length <= 5) {
      this.errorMessage = 'Firstname is too short';
      return false;
    } if (this.register.lastName == '' || this.register.lastName.trim().length <= 5) {
      this.errorMessage = 'Lastname is too short';
      return false;
    } if (this.register.userName == '' || this.register.userName.trim().length <= 5) {
      this.errorMessage = 'Username is too short';
      return false;
    } if (this.register.email == '' || this.register.email.trim().length <= 5) {
      this.errorMessage = 'Email is too short';
      return false;
    } if (this.register.role.roleName == '') {
      this.errorMessage = 'Role is not selected';
      return false;
    }
    return true;
  }

  resetUserForm() {
    (<HTMLInputElement>document.getElementById('firstName')).value = '';
    (<HTMLInputElement>document.getElementById('lastName')).value = '';
    (<HTMLInputElement>document.getElementById('userName')).value = '';
    (<HTMLInputElement>document.getElementById('email')).value = '';
  }

}

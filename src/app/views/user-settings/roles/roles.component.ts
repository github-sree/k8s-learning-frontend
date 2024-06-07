import { Component, OnInit } from '@angular/core';
import { RolePrivilegeService } from "../../../services/http/roles-privileges.service";
import { Pagable, Role, PaginationPlugin, Pagination } from 'src/app/model/auth.model';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, Pagable {
  privileges: string[] = [];
  items: string[] = [];
  placeolder: string[] = [];
  targetItems: string[] = [];
  roleInput: Role = new Role();
  roles: Role[]=[];
  roleValidated = false;
  active!: boolean;
  errorMessage!: string;
  successMessage!: string;
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
  constructor(private privilegeService: RolePrivilegeService) {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  idTrackBy(index: number, role: Role) {  
    return role.roleId;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  ngOnInit(): void {
    this.refershPrivieges();
    this.getRoles();
  }

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getRoles();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 0;
    this.getRoles();
  }
  onSubmit() {
    this.roleInput.roleName = (<HTMLInputElement>document.getElementById('roleName')).value;
    const active = document.querySelector('input[name="roleStatus"]:checked') as HTMLInputElement;
    if (active) {
      this.roleInput.active = active.value == "true";
    }
    this.roleInput.privilegeNames = this.targetItems;
    this.roleValidated = true;
    if (this.validateRoles()) {
      this.privilegeService.createRole(this.roleInput).subscribe({
        next: (response) => {
          console.log(response.message);

          this.successMessage = response.message;
          this.visible = true;
          this.resetItems();
          this.roleValidated = false;
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  passValue(role: Role) {
    this.roleInput = role;
    role.privilegeNames.forEach(privileges => {
      if (!this.targetItems.includes(privileges)) {
        this.targetItems.push(privileges);
      }
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
    (<HTMLInputElement>document.getElementById('roleName')).value = this.roleInput.roleName;
    if (this.roleInput.active) {
      (<HTMLInputElement>document.getElementById('roleActive')).checked = true;
    } else {
      (<HTMLInputElement>document.getElementById('roleInActive')).checked = true;
    }
    this.successMessage = '';
  }

  onSort(columnName: string, sorting: boolean) {
    this.sorting = !sorting;
    console.log('sort='.concat(columnName).concat(',').concat(this.sorting ? 'asc' : 'desc'));
  }

  getRoles() {
    this.pagination.page = this.pagingConfig.currentPage <= 0 ? 0 : this.pagingConfig.currentPage - 1;
    this.pagination.size = this.pagingConfig.itemsPerPage;
    this.privilegeService.getRoles(this.pagination).subscribe({
      next: (response) => {
        this.roles = response.rows;
        this.pagingConfig.totalItems = response.totalCount;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  validateRoles() {
    if (this.roleInput.roleName == '' || this.roleInput.roleName.trim().length <= 5) {
      this.errorMessage = 'Rolename is too short';
      return false;
    } if (this.roleInput.active == undefined) {
      this.errorMessage = 'Rolestatus is required';
      return false;
    } if (this.roleInput.privilegeNames.length == 0) {
      this.errorMessage = 'Privileges not selected, Please select at least one';
      return false;
    }
    return true;
  }

  refershPrivieges(): void {
    this.privilegeService.privilegeNames().subscribe({
      next: (response) => {
        response.forEach(element => {
          if (!this.privileges.includes(element)) {
            this.privileges.push(element);
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  AddtoArray(privilege: string) {
    if (!this.items.includes(privilege)) {
      this.items.push(privilege);
    }
  }

  clearFromArray(privilege: string) {
    if (!this.placeolder.includes(privilege)) {
      this.placeolder.push(privilege);
    }
  }

  pushItem() {
    this.items.forEach(value => {
      if (!this.targetItems.includes(value)) {
        this.targetItems.push(value);
      }
    });
    this.items = [];
  }

  clearItem() {
    this.placeolder.forEach(value => {
      var index = this.targetItems.indexOf(value);
      if (index !== -1) {
        this.targetItems.splice(index, 1);
      }
    });
  }

  clearAllItem() {
    this.targetItems = [];
  }

  pushAllItem() {
    this.items = [];
    this.privileges.forEach(value => {
      if (!this.targetItems.includes(value)) {
        this.targetItems.push(value);
      }
    });
    this.placeolder = [];
  }

  resetItems() {
    (<HTMLInputElement>document.getElementById('roleName')).value = '';
    (<HTMLInputElement>document.getElementById('roleActive')).checked = false;
    (<HTMLInputElement>document.getElementById('roleInActive')).checked = false;
    this.items = [];
    this.targetItems = [];
    this.placeolder = [];
    this.roleInput = new Role();
  }
}

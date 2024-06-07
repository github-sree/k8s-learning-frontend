import { Component, OnInit } from '@angular/core';
import { Pagable, Pagination, Privilege } from 'src/app/model/auth.model';
import { RolePrivilegeService } from 'src/app/services/http/roles-privileges.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit, Pagable {
  privilegeValidated: boolean = false;
  successMessage!: string;
  success: String = new String();
  errorMessage!: string;
  privilegeInput: Privilege = new Privilege();
  privilegeList!: Privilege[];
  pagingConfig: Pagable = {} as Pagable;
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  tableSize: number[] = [5, 10, 15, 20, 50, 100];
  pagination: Pagination = new Pagination();
  sorting: boolean = false;
  visible: boolean = false;
  position = 'bottom-end';
  color='warning';
  percentage = 0;
  constructor(private privilegeService: RolePrivilegeService) {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  idTrackBy(index: number, privilege: Privilege) {     
    return privilege.privilegeId;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  ngOnInit(): void {
    this.allPrivileges();
  }

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.allPrivileges();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 0;
    this.allPrivileges();
  }

  onSort(columnName: string, sorting: boolean) {
    this.sorting = !sorting;
    console.log('sort='.concat(columnName).concat(',').concat(this.sorting ? 'asc' : 'desc'));
  }

  allPrivileges() {
    this.pagination.page = this.pagingConfig.currentPage <= 0 ? 0 : this.pagingConfig.currentPage - 1;
    this.pagination.size = this.pagingConfig.itemsPerPage;
    this.privilegeService.allPrivileges(this.pagination).subscribe({
      next: (response) => {
        this.privilegeList = response.rows;
        this.pagingConfig.totalItems = response.totalCount;
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  passValue(privilege: Privilege) {
    this.privilegeInput = privilege;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    (<HTMLInputElement>document.getElementById('privilegeName')).value = this.privilegeInput.name;
    this.privilegeValidated = false;
    this.successMessage = '';
  }

  onSubmit() {
    this.privilegeValidated = true;
    this.privilegeInput.name = (<HTMLInputElement>document.getElementById('privilegeName')).value;
    if (this.validatePrivilege()) {
      this.privilegeService.createPrivileges(this.privilegeInput).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.visible = true;
          this.resetItems();
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
  validatePrivilege() {
    if (this.privilegeInput.name == '' || this.privilegeInput.name.trim().length <= 5) {
      this.errorMessage = 'Privilege name required, atleast 6 letters needed';
      return false;
    }
    return true;
  }

  resetItems() {
    (<HTMLInputElement>document.getElementById('privilegeName')).value = '';
    this.privilegeInput = new Privilege();
    this.privilegeValidated = false;
    this.errorMessage = '';
  }

}

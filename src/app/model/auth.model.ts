export class AuthRequest {
    userName: string = '';
    passWord: string = '';
}

export class Pagination {
    page!: number;
    size!: number;
    sort!: string;
}

export class AuthCreateRequest {
    firstName!: string;
    lastName!: string;
    userName!: string;
    email!: string;
    password!: string;
    rePassword!: string;
    role!: Role;
}

export class Role {
    roleId!: string;
    roleName!: string;
    active!: boolean;
    privilegeNames!: string[];
    message!: string;
}

export class Privilege {
    privilegeId!: string;
    name!: string;
    message!: string;
}

export class UserList {
    message!: string;
    status!: string;
    totalCount!: number;
    pageNo!: number;
    totalPages!: number;
    pageSize!: number;
    rows!: User[];
}

export class RoleList {
    message!: string;
    status!: string;
    totalCount!: number;
    pageNo!: number;
    totalPages!: number;
    pageSize!: number;
    rows!: Role[];
}

export class PrivilegeList {
    message!: string;
    status!: string;
    totalCount!: number;
    pageNo!: number;
    totalPages!: number;
    pageSize!: number;
    rows!: Privilege[];
}

export interface Pagable {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export class CustomResponse {
    status!:string;
    message!:string;
}

export class User extends CustomResponse {
    userId!:string;
    firstName!: string;
    lastName!: string;
    userName!: string;
    email!: string;
    role!: Role;
    enabled!: boolean;
}

export class LoggedUser {
    firstName!: string;
    lastName!: string;
    userName!: string;
    email!: string;
    role!: string;
    authorities!: string[];
}

export abstract class PaginationPlugin {
    page!: number;
    size!: number;
    sort!: string;
    pagingConfig: Pagable = {} as Pagable;
    currentPage: number = 0;
    itemsPerPage: number = 5;
    totalItems: number = 0;
    tableSize: number[] = [5, 10, 15, 20, 50, 100];
    pagination: Pagination = new Pagination();
    abstract onTableDataChange(event: any): void;
    abstract onTableSizeChange(event: any): void;
}
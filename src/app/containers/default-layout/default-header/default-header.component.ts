import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from "../../../services/http/auth.service";
import { StorageService } from "../../../services/storage.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private loginService: AuthService, private router: Router
    ,private storageService:StorageService) {
    super();
  }

  signOut() {
    this.loginService.logOut().subscribe({
      next: () => {
        console.log('logout');
        this.storageService.clean();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

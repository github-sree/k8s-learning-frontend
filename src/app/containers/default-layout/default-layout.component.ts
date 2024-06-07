import { Component } from '@angular/core';

import { navItems } from './_nav';
import { StorageService } from 'src/app/services/storage.service';
import * as Constants from '../../model/app.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private storageService: StorageService) {
    this.renderNavItems();
  }
  
  renderNavItems() {
    const loggedUser = this.storageService.getUser();
    if (loggedUser != null && loggedUser.authorities != null) {
      navItems.forEach(navItem => {
        if (navItem.name == Constants.USER_SETTINGS_NAV && !loggedUser.authorities.includes(Constants.USER_READ)) {
          var index = this.navItems.indexOf(navItem);
          if (index !== -1) {
            this.navItems.splice(index, 1);
          }
          const childItem = navItem.children;
          childItem?.forEach(child => {
            if (child.name == Constants.USER_SETTINGS_ROLES_NAV && !loggedUser.authorities.includes(Constants.ROLES_READ)) {
              var index = childItem?.indexOf(child);
              if (index !== -1) {
                this.navItems.splice(index, 1);
              }
            } if (child.name == Constants.USER_SETTINGS_PERMISSIONS_NAV && !loggedUser.authorities.includes(Constants.PRIVILEGE_READ)) {
              var index = childItem?.indexOf(child);
              if (index !== -1) {
                this.navItems.splice(index, 1);
              }
            }
          });
        }
      });
    }
  }


}

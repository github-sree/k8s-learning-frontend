import { INavData } from '@coreui/angular';
import * as Constants from '../../model/app.constant';
export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'ADMIN SECTION',
  }, {
    name: Constants.USER_SETTINGS_NAV,
    url: '/login',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: Constants.USER_SETTINGS_ROLES_NAV,
        iconComponent: { name: 'cil-settings' },
        url: '/user-setting/roles'
      },
      {
        name: Constants.USER_SETTINGS_PERMISSIONS_NAV,
        iconComponent: { name: 'cil-settings' },
        url: '/user-setting/permissions'
      }]
  },{
    name: Constants.MANAGE_USERS,
    url: '/login',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: Constants.USER_CREATION,
        iconComponent: { name: 'cil-settings' },
        url: '/user-setting/user'
      },
      {
        name: Constants.USER_APPROVAL,
        iconComponent: { name: 'cil-settings' },
        url: '/user-setting/user'
      }]
  }
];

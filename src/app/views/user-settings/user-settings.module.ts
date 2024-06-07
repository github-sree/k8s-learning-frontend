import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalloutModule, ModalModule, NavModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ToastModule,ButtonGroupModule,TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from 'src/app/shared/app-shared.module';
import { UserSettingsRoutingModule } from "./user-settings-routing.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    RolesComponent,
    PermissionsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    ToastModule,
    AppSharedModule,
    UserSettingsRoutingModule,CalloutModule, NavModule, TabsModule, UtilitiesModule,ButtonGroupModule,
    TooltipModule,TableModule,NgxPaginationModule,ModalModule
  ]
})
export class UserSettingsModule { }

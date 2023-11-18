import { Component } from '@angular/core';
import { AuthCreateRequest } from '../../../model/auth.model';
import { AuthService } from '../../../services/http/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {
  register: AuthCreateRequest = new AuthCreateRequest();
  setupValidated = false;
  errorMessage = '';
  visible: boolean = false;
  position = 'bottom-end';
  percentage = 0;
  constructor(private registerService: AuthService, private router: Router) { }

  onSubmit() {
    this.register.firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    this.register.lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
    this.register.userName = (<HTMLInputElement>document.getElementById('userName')).value;
    this.register.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.register.password = (<HTMLInputElement>document.getElementById('password')).value;
    this.register.rePassword = (<HTMLInputElement>document.getElementById('rePassword')).value;

    if (this.validateRegister()) {
      this.registerService.setupRegisteration(this.register).subscribe({
        next: () => { this.router.navigate(['/login']) },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.visible = true;
        },

      });
    }
    this.setupValidated = true;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
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
    } if (this.register.password == '' || this.register.password.trim().length <= 5) {
      this.errorMessage = 'Password is too short';
      return false;
    } if (this.register.rePassword == '' || this.register.rePassword.trim().length <= 5) {
      this.errorMessage = 'Repeat Password is too short';
      return false;
    }
    if (this.register.password !== this.register.rePassword) {
      this.errorMessage = 'Password not equal';
      return false;
    }
    return true;
  }
}

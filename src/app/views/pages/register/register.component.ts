import { Component } from '@angular/core';
import { AuthCreateRequest } from '../../../model/auth.model'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  register: AuthCreateRequest = new AuthCreateRequest();
  registerstylesValidated = false; errorMessage = '';
  visible: boolean = false;
  position = 'bottom-end';
  percentage = 0;
  constructor() { }

  onSubmit() {
    this.register.firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    this.register.lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
    this.register.userName = (<HTMLInputElement>document.getElementById('userName')).value;
    this.register.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.register.password = (<HTMLInputElement>document.getElementById('password')).value;
    this.register.rePassword = (<HTMLInputElement>document.getElementById('rePassword')).value;
    console.log(this.register);
    if (this.validateRegister(this.register)) {

    }
    this.registerstylesValidated = true;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  validateRegister(register: AuthCreateRequest) {
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



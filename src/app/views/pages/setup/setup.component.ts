import { Component } from '@angular/core';
import { AuthCreateRequest, User } from '../../../model/auth.model';
import { AuthService } from '../../../services/http/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {
  otpValidated: boolean = false;
  register: AuthCreateRequest = new AuthCreateRequest();
  setupValidated = false;
  errorMessage = '';
  visible: boolean = false;
  position = 'bottom-end';
  percentage = 0;
  otpFlag: boolean = false;
  user: User = new User();
  otpVisible: boolean = false;
  otpMessage: string = '';
  progressing: boolean = false;
vProgressing: any;
  constructor(private registerService: AuthService, private router: Router) { }

  onSubmit() {
    this.progressing = true;
    this.register.firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    this.register.lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
    this.register.userName = (<HTMLInputElement>document.getElementById('userName')).value;
    this.register.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.register.password = (<HTMLInputElement>document.getElementById('password')).value;
    this.register.rePassword = (<HTMLInputElement>document.getElementById('rePassword')).value;

    if (this.validateRegister()) {
      this.registerService.setupRegisteration(this.register).subscribe({
        next: (user) => {
          this.otpFlag = true;
          this.otpVisible = true;
          this.otpMessage = 'OTP sent to registered mail, Please check the mail!!';
          this.user = user;
          this.progressing = false;
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.visible = true;
          this.progressing = false;
        },
      });
    } else {
      this.visible = true;
      this.setupValidated = true;
      this.progressing = false;
    }
  }

  onOTPSubmit() {
    this.vProgressing = true;
    let otp = (<HTMLInputElement>document.getElementById('otp')).value;
    if (this.validateOtp(otp)) {
      this.registerService.verifyUser(this.user.userId, otp).subscribe(
        {
          next: () => {
            this.vProgressing = false;
             this.router.navigate(['/login'])
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.visible = true;
            this.vProgressing = false;
          }
        }
      );
    } else {
      this.visible = true;
      this.otpValidated = true;
      this.vProgressing = false;
    }
  }

  resendOTP() {
    this.progressing = true;
    this.registerService.resendOTP(this.user.userId).subscribe(
      {
        next: (response) => {
          this.otpMessage = response.message;
          this.otpVisible = true;
          this.progressing = false;
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.visible = true;
          this.progressing = false;
        }
      }
    );
  }

  validateOtp(otp: string) {
    let reg = /^\d+$/;
    if (otp == '' || otp.trim().length < 6) {
      this.errorMessage = 'OTP is too short';
      return false;
    }
    if (!reg.test(otp)) {
      this.errorMessage = 'Only numbers are allowed';
      return false;
    }
    return true;
  }

  onErrorVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onErrorTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  onVisibleChange($event: boolean) {
    this.otpVisible = $event;
    this.percentage = !this.otpVisible ? 0 : this.percentage;
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


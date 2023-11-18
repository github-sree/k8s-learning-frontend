import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/http/auth.service';
import { StorageService } from '../../../services/storage.service';
import { AuthRequest } from 'src/app/model/auth.model';
import { Router } from '@angular/router';
import { ToastComponent } from '@coreui/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: AuthRequest = new AuthRequest();
  loginStylesValidated = false;
  errorMessage = '';
  visible: boolean = false;
  position = 'bottom-end';
  percentage = 0;

  constructor(private loginService: AuthService, private router: Router, private storageService: StorageService,
  ) {
 
  }
  ngOnInit(): void {

  }

  onSubmit() {
    this.login.userName = (<HTMLInputElement>document.getElementById('userName')).value;
    this.login.passWord = (<HTMLInputElement>document.getElementById('passWord')).value;

    this.loginStylesValidated = true;

    if (this.validateCredentials()) {
      this.loginService.loginService(this.login).subscribe({
        next: (response) => {
          this.storageService.saveUser(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.error;
          this.visible = true;
        }
      });
    }
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  validateCredentials() {
    if (this.login.userName == undefined || this.login.userName == '' || this.login.userName.trim().length <= 5) {
      this.errorMessage = 'Username or password is too short';
      return false;
    } if (this.login.passWord == undefined || this.login.passWord == '' || this.login.passWord.trim().length <= 5) {
      this.errorMessage = 'Username or password is too short';
      return false;
    }
    return true;
  }
}

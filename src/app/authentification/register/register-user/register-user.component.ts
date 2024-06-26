import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent implements OnInit {

  newUser = {email: '', password: ''};
  existingUser = {email: '', password: ''};

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.register(this.newUser.email, this.newUser.password)
    .then(createdUser => {
      console.log('createdUser', createdUser);
    })
    .catch(error => console.error(error.message));
  }

  loginUser() {
    this.authService.login(this.existingUser.email, this.existingUser.password)
    .then(value => {
      console.log('User logged successfully', value);
    })
    .catch(error => console.error('error : ',error.message));
  }

  logoutUser() {
    this.authService.logout();
  }
}
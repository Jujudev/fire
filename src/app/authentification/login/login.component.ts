import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(public af: AngularFireAuth, public authService: AuthService, private router: Router)  { 
    this.af.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/');
      }
    });
  }

  loginFacebook() {
    this.authService.loginWithFacebook();
  }

  loginGoogle() {
    this.authService.loginWithGoogle();
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
          (sucess) => {
            console.log(sucess);           
            this.authService.updateUserData(sucess.user);
            this.router.navigate(['/'])
          }).catch(
              (err) => {
                this.error = err;
              }
          )
    }
  }

  ngOnInit() {
  }

}

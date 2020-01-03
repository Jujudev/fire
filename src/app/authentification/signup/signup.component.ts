import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  state: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  error: any;

  constructor(public af: AngularFireAuth, private router: Router, public authService: AuthService) { }

  onSubmit(formData) {
    if(formData.valid) {
      console.log('onSubmit(formData)');
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
          (sucess) => {
            console.log(sucess);
              this.authService.sendEmailVerification();
              this.router.navigate(['/']);            
          }).catch(
              (err) => {
                this.error = err;
              }
          )
    }
  }

  register(email:string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }
  
  ngOnInit() {
  }

}

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.scss']
})
export class LoginCompanyComponent implements OnInit {
  error: any;

  constructor(public af: AngularFireAuth, public authService: AuthService, private router: Router) { 

  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.authService.login(formData.value.email, formData.value.password)
        .then(
          (sucess) => {
            console.log(sucess);           
            this.authService.setCompanyData();
            this.router.navigate(['/company-profile']);
          }).catch(
              (err) => {
                this.error = err;
              }
          )
    }
  }

}

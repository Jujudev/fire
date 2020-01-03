import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.scss']
})
export class SignupCompanyComponent implements OnInit {
  error: any;
  email: any;
  password: any;
  secondemail: any;
  city: any;
  name: any;
  country: any;
  newCompany:Company = new Company();

  constructor(public af: AngularFireAuth, private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.newCompany.city = this.city;
      this.newCompany.country = this.country;
      this.newCompany.email = this.email;
      this.newCompany.name = this.name;
      this.newCompany.isVerified = false;
      this.newCompany.jobemail = this.secondemail;

      this.authService.createCompanyWithEmailAndPassword(this.newCompany, this.password);

      if(this.authService.error$)
      {
        this.error = this.authService.error$;
      }
      else
      {
        console.log('Company created sucessfully');
        this.router.navigate(['/']);
      }
      this.newCompany = this.newCompany = new Company();
    }
  }
}

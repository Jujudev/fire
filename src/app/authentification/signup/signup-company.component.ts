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
  error: string;
  email: string;
  password: any;
  secondemail: string;
  city: string;
  name: string;
  country: string;
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
      this.newCompany.postalcode = '';
      this.authService.createCompanyWithEmailAndPassword(this.newCompany, this.password);

      if(this.authService.error$)
      {
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

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
  state: string = '';
  error: any;
  newCompany:Company = new Company();

  constructor(public af: AngularFireAuth, private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.newCompany.city = formData.value.city;
      this.newCompany.country = formData.value.country;
      this.newCompany.email = formData.value.email;
      this.newCompany.name = formData.value.name;
      this.newCompany.isVerified = false;
      this.newCompany.jobemail = formData.value.secondemail;

      this.authService.createCompanyWithEmailAndPassword(this.newCompany, formData.value.password);

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

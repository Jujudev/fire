import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentification/services/auth.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { JobService } from 'src/app/jobs/shared/job.service';
import { Company } from 'src/app/models/company.model';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  data : Company;
  constructor(public authService: AuthService, public jobService : JobService, private tostr : ToastrService) { 
    this.authService.setCompanyData();
    if(authService.company$)
    {
      authService.company$.subscribe( val => {this.data = val as Company;})
    }
  }

  ngOnInit() {
  }

  onSubmit(value)
  {
    console.log('onSubmit Company Profile')
    console.log(value.uid)
    if(value.uid !== null)
    {
      this.authService.updateCompanyData(this.data)
      .then(() => this.tostr.success('Votre profil a été mis à jour', ''));
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentification/services/auth.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { JobService } from 'src/app/jobs/shared/job.service';
import { Company } from 'src/app/models/company.model';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  data : Company;
  constructor(private authService: AuthService, private jobService : JobService) { 
    if(authService)
    {
      authService.company$.subscribe( val => {this.data = val as Company;})
    }
  }

  ngOnInit() {
  }

}

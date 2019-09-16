import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentification/services/auth.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isCompany : Observable<boolean>;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.user$
                 .take(1)
                 .map(user => _.has(_.get(user, 'roles'), 'company'))
                 .subscribe(authorized => {
                  this.isCompany = of(authorized);
                  if(this.isCompany)
                    this.router.navigate(['/company-profile']);
                 });
  }

  ngOnInit() {

  }
}

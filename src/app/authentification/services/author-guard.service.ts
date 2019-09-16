import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import * as _ from 'lodash';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthorGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
          return this.auth.user$
                 .take(1)
                 .map(user => _.has(_.get(user, 'roles'), 'company'))
                 .do(authorized => {
                   if (!authorized) {
                     var error = 'not authorized user!'
                     console.log(error);
                     this.auth.error$ = of(error);
                   }
                 });
  }

  constructor(private auth: AuthService, private router: Router) {
    
  }
}

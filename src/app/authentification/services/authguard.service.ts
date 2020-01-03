import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()

export class AuthguardService  implements CanActivate{

  constructor(private angularfireAuth: AngularFireAuth, private router: Router) { }

    canActivate(): Observable<boolean> {
        return  this.angularfireAuth.authState.pipe(
          map(status => {
            if(!status) {
              this.router.navigate(['/login'])
            } else {
                return true;
            }
          }));
    }
}

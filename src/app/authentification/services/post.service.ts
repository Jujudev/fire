import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  userRoles: Array<string>; // roles of currently logged in uer

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    auth.user$.map(user => {
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()
   }
    ///// Authorization Logic /////

    get canRead(): boolean {
      const allowed = ['admin', 'author', 'reader']
      return this.matchingRole(allowed)
    }
  
    get canEdit(): boolean {
      const allowed = ['admin', 'author','company'];
      console.log(this.matchingRole(allowed));
      return this.matchingRole(allowed);
    }
  
    get canDelete(): boolean {
      const allowed = ['admin']
      return this.matchingRole(allowed)
    }
    
    /// Helper to determine if any matching roles exist
    private matchingRole(allowedRoles): boolean {
      return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
    }
  
}

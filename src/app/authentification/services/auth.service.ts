import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { User } from './user';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Company } from 'src/app/models/company.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User>;
  company$: Observable<Company>;
  error$ : Observable<string>;

  uid =  this.angularfireAuth.authState.pipe(
      map(authState => {
        if(!authState.uid) {
          console.log('!authState.uid');          
          return false;
        } 
        else {
          return authState.uid;
        }
    }));
           
  constructor(private angularfireAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 
    //// Get auth data, then get firestore user document || null
    this.user$ = this.angularfireAuth.authState.pipe(switchMap(user => {
        if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } 
        else {
          return of(null);
        }
    }));
    
    this.user$.take(1).map(user => _.has(_.get(user, 'roles'), 'company'))
    .subscribe(isCompany => {
        if(isCompany)
        {
          this.setCompanyData();
        }
    });
  }

  setCompanyData()
  {
    this.company$ = this.angularfireAuth.authState.pipe(switchMap(user => {
      if (user) {
          return this.afs.doc<User>(`companies/${user.uid}`).valueChanges();
      } 
      else {
        return of(null);
      }
  }));
  }
  

  loginWithGoogle()
  {
    this.angularfireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())    
    .then(credential =>  {
      console.info('Sign In with Google');
      this.router.navigate(['/']);
      
  }).catch(
    (err) => {
      this.error$ = err;
      console.error('Error on Facebook ', this.error$);
  });
  }

  loginWithFacebook()
  {
      this.angularfireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())    
      .then(credential =>  {
        console.info('Sign In with Facebook');
        this.router.navigate(['/']);
    }).catch(
      (err) => {
        this.error$ = err;
        console.error('Error on Facebook ', this.error$);
    });
  }

  loginWithEmailAndPassword(email, password)
  {
    this.angularfireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(
      (auth) => {
        console.log('sucess');           
        this.router.navigate(['/'])
      }).catch(
          (err) => {
            this.error$ = err;
          }
      )
  }

  register(email:string, password: string) {
    return this.angularfireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.angularfireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.angularfireAuth.auth.signOut();
  }

  sendEmailVerification() {
    const user = firebase.auth().currentUser;
    if(user) {
        user.sendEmailVerification().then(() => {
          console.log('email validation sent');
        }).catch((error) => {
          console.error('error sending email', error);
        })
    }
  }

  createCompanyWithEmailAndPassword(company: Company, password) {
      this.angularfireAuth.auth.createUserWithEmailAndPassword(company.email, password)    
      .then(credential =>  {
        console.info('Company created successfully');
        company.uid = credential.user.uid; 
        company.isVerified = false;
        this.sendEmailVerification();
        this.updateCompanyData(company);       
        this.router.navigate(['/']);
    }).catch(
      (err) => {
        this.error$ = err;
        console.error('Error on createCompanyWithEmailAndPassword');
    });

  }

  updateUser(uid, user:User){
    console.log('updateUser');
    console.log(uid);
    console.log(user.uid);
    return this.afs.collection('users').doc(uid).update({uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true
      },
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      photoURL: user.photoURL,
      profession: user.profession,
      address: user.address,
      introduction: user.introduction});
  }



  public updateCompanyData(company) {
    // Sets company data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`companies/${company.uid}`);
    const data: Company = {
      uid: company.uid,
      email: company.email,
      city: company.city,
      country: company.country,
      name: company.name,
      jobemail: company.jobemail,
      isVerified: company.isVerified,
      postalcode: company.postalcode
    }
    return userRef.set(data, { merge: true })
  }
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth, private router: Router) { 
    this.af.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    })
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
          (sucess) => {
            console.log(sucess);
            this.router.navigate(['/members'])
          }).catch(
              (err) => {
                this.error = err;
              }
          )
    }
  }

  ngOnInit() {
  }

}

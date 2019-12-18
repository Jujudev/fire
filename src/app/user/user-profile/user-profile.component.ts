import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentification/services/auth.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { JobService } from 'src/app/jobs/shared/job.service';
import { Job, UserJob } from 'src/app/models/job.model';
import { User } from 'src/app/authentification/services/user';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isCompany : Observable<boolean>;
  userJobLinksList : Observable<UserJob[]> = new Observable<UserJob[]>();
  postedJobs : Observable<Job[]> = new Observable<Job[]>();
  postedJobsCount : number = 0;
  postedJobsId : string[] ;
  user : User;

  
  constructor(private authService: AuthService, private router: Router, private jobService: JobService) {
    this.authService.user$
                 .take(1)
                 .map(user => _.has(_.get(user, 'roles'), 'company'))
                 .subscribe(authorized => {
                  this.isCompany = of(authorized);
                  if(this.isCompany)
                    this.router.navigate(['/company-profile']);
                 });

    this.authService.user$.subscribe(user =>
    {
      if(user)
      {
        this.user = user;
        this.userJobLinksList = this.jobService.getUserPostLinks(user.uid).pipe(
          map(changes => {
              return changes.map(a => {
                const data = a.payload.doc.data() as UserJob ;
                data.$id = a.payload.doc.id;
                return data;
              })}
            ));
        this.userJobLinksList.subscribe( x => {       
            this.postedJobsId = x.map(({ jobUid }) => jobUid) as string[];
            this.postedJobs = this.jobService.getPostedJobs(this.postedJobsId).pipe(
              map(changes => {
                  return changes.map(a => {
                    const data = a.payload.doc.data() as Job ;
                    data.$id = a.payload.doc.id;
                    this.postedJobsCount++;
                    return data;
                  })}
                ));
        });
      }
    });
  }

  ngOnInit() {

  }

  onSubmitProfile(value)
  {
    if(value.id != null)
    {
      var userUpdate = value as User;
      console.log('gooo gooo');

      this.authService.updateUserAdditionalInfos(value.id, userUpdate.profession, userUpdate.address, userUpdate.introduction);
    }
  }
}

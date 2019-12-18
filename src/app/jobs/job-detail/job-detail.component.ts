import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../authentification/services/auth.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
 
  job:any;
  user:any;
  constructor(private jobService : JobService, private route: ActivatedRoute, private router: Router, private tostr : ToastrService, public authService: AuthService) {
    authService.user$.subscribe( val => {this.user = val;})
   }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.job = data.payload.data() as Job;
        this.job.$id = data.payload.id;
      }
    })
  }

  sendEmail()
  {
      if((typeof this.user!='undefined' && this.user))
      {
          var user_job = {
            userUid : this.user.uid,
            jobUid : this.job.$id,
            jobEmail : this.job.email,
            jobTitle : this.job.title,
            postDate : Date.now()
          }
          this.jobService.applyJob(user_job);
          this.tostr.success('Votre candidature a été soumise', this.job.title);
      }      
  }
}


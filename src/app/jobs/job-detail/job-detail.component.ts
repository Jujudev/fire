import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job.model';
import { EmailServiceService } from 'src/app/shared/email-service.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
 
  job:any;
  constructor(private jobService : JobService, private route: ActivatedRoute, private router: Router, private emailService : EmailServiceService) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.job = data.payload.data() as Job;
        this.job.$id = data.payload.id;
        console.info('hello', this.job);
      }
    })
  }

  sendEmail()
  {
    this.emailService.SendEmail();
    console.info('Sending Email Bassirou');
  }

}

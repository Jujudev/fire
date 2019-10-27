import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { Job } from '../../models/job.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";



@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobList : Observable<any> = new Observable<any>();
  jobsCount : number = 0;

  constructor(private jobService : JobService, private route: ActivatedRoute) {
   }
   

  ngOnInit() {
    this.route.queryParams.subscribe( (c) => {
      this.jobList = this.jobService.getJobsByCityAndTitle(c['key'], c['city']).pipe(
        map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Job;
              data.$id = a.payload.doc.id;
              this.jobsCount++;
              return data;
            }
          )
        }));
  });
  }


}

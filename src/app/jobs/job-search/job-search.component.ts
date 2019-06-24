import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  jobList : Observable<any> = new Observable<any>();


  constructor(private jobService : JobService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.jobList = data.payload.data() as Observable<Job>;
      }
    })
  }
}

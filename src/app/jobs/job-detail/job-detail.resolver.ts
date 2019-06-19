import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { JobService } from '../shared/job.service';

@Injectable()
export class JobDetailResolver implements Resolve<any> {

  constructor(public jobService: JobService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let jobId = route.paramMap.get('id');
      this.jobService.getJob(jobId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { JobService } from '../shared/job.service';

@Injectable()
export class JobSearchResultResolver  implements Resolve<any>{

  constructor(public jobService: JobService) { }

    resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let city = route.paramMap.get('city');
      let key = route.paramMap.get('key');
      this.jobService.getJobsByCityAndTitle(city, key)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}

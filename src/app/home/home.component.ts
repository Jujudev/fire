import { Component, OnInit } from '@angular/core';
import { JobService } from '../jobs/shared/job.service';
import { Job } from '../models/job.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobList : Observable<any> = new Observable<any>();
  searchCityValue: string = "";
  searchKeyValue: string = "";

  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(public jobService : JobService, private router: Router) { }

  ngOnInit() {
    
    console.info('loading jobs');
    this.jobList = this.jobService.getJobs().pipe(
      map(changes => {
        this.items = changes;
        this.age_filtered_items = changes;
        this.name_filtered_items = changes;
          return changes.map(a => {
            const data = a.payload.doc.data() as Job;
            data.$id = a.payload.doc.id;
            return data;
          }
        )
      }));
  }

  onSearchClick()
  {
    console.log('onSearchClick:key='+this.searchKeyValue.toLocaleLowerCase()+ ' and city ='+this.searchCityValue.toLocaleLowerCase())
    this.router.navigate(['jobs'], {
      queryParams: {'key' : this.searchKeyValue.toLocaleLowerCase(), 'city' : this.searchCityValue.toLocaleLowerCase()}
    });
  }
}

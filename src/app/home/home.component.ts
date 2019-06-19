import { Component, OnInit } from '@angular/core';
import { JobService } from '../jobs/shared/job.service';
import { Job } from '../models/job.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobList : Observable<any> = new Observable<any>();
  searchCityValue: string = "";
  searchTitleValue: string = "";

  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(private jobService : JobService) { }

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
  searchByTitle(){
    let value = this.searchTitleValue.toLowerCase();
    this.jobService.searchJob(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  searchByCity(){
    let value = this.searchCityValue.toLowerCase();
    console.log('searchByCity()', value);
    this.jobService.searchJobsByCity(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  combineLists(a, b){
    console.log('start combine')
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}

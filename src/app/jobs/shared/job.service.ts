import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})


export class JobService {
  jobList: AngularFireList<any>;
  selectedJob: Job = new Job();

  constructor(private firebase :AngularFireDatabase) { }

  getData(){
    this.jobList = this.firebase.list('jobs');
    return this.jobList;
  }

  insertJob(job : Job)
  {
    this.jobList.push({
      title : job.title,
      description : job.description,
      salary: job.salary,
      publishDate : Date.now()
    })
  }

  updateJob(job : Job)
  {
    this.jobList.update(job.$key, {
      title : job.title,
      description : job.description,
      salary : job.salary,
      publishDate: Date.now()
    });
  }

  deleteJob($key : string)
  {
    this.jobList.remove($key);
  }
  

}

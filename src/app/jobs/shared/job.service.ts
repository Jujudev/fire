import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  private basePath : string = 'jobs';
  selectedJob: Job = new Job();

  constructor(private db :AngularFirestore) { }

  getJob(jobKey){
    return this.db.collection(this.basePath).doc(jobKey).snapshotChanges();
  }

  updateJob(jobKey, value){
    return this.db.collection(this.basePath).doc(jobKey).set(value);
  }

  deleteJob(jobKey){
    return this.db.collection(this.basePath).doc(jobKey).delete();
  }

  getJobs(){
    return this.db.collection(this.basePath).snapshotChanges();
  }

  searchJob(searchValue){
    return this.db.collection(this.basePath,ref => ref.where('titleToSearch', '>=', searchValue)
      .where('titleToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }
  
  insertJob(job){
    return this.db.collection(this.basePath).add({
      title : job.title,
      description : job.description,
      salary: job.salary,
      publishDate : Date.now()
    });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job } from '../../models/job.model';

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

  getJobsByCityAndTitle(city, title)
  {
    if(!this.isValueNotNullOrEmpty(title) && !this.isValueNotNullOrEmpty(city))
    {
      return this.getJobs();
    }
    else if (this.isValueNotNullOrEmpty(title) && !this.isValueNotNullOrEmpty(city))
    {
      return this.searchJob(title);
    }
    else if (!this.isValueNotNullOrEmpty(title) && this.isValueNotNullOrEmpty(city))
    {
      return this.searchJobsByCity(city);
    }

    return this.db.collection(this.basePath, ref => ref.where("title", "==", title).where("city", "==", city)).snapshotChanges();
  }

  searchJob(searchValue){
    return this.db.collection(this.basePath, ref => ref.where("title", "==", searchValue)).snapshotChanges();
  }

  searchJobsByCity(searchValue){
    return this.db.collection(this.basePath, ref => ref.where("city", "==", searchValue)).snapshotChanges();
  }
  
  insertJob(job){
    return this.db.collection(this.basePath).add({
      title : job.title,
      description : job.description,
      salary: job.salary,
      publishDate : Date.now(),
      company : job.company,
      contractType: job.contractType
    });
  }

  isValueNotNullOrEmpty(key : any)
  {
    return (typeof key!='undefined' && key);
  }
}

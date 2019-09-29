import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job } from '../../models/job.model';
import { Company } from 'src/app/models/company.model';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  getCompanyJobs() {
    return this.db.collection(this.basePath).snapshotChanges();
  } 

  private basePath : string = 'jobs';
  selectedJob: Job = new Job();

  constructor(private db :AngularFirestore) { }

  getJob(jobKey){
    return this.db.collection(this.basePath).doc(jobKey).snapshotChanges();
  }

  getCompany(companyKey : string) {
    return this.db.collection('companies').doc(companyKey).snapshotChanges();
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
      description1 : job.description1,
      description2 : job.description2,
      salary: job.salary,
      publishDate : Date.now(),
      contractType: job.contractType,
      country: job.country,
      city: job.city,
      email: job.email,
    });
  }

  isValueNotNullOrEmpty(key : any)
  {
    return (typeof key!='undefined' && key);
  }
}

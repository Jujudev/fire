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

  getJobsByCityAndTitle(title, city)
  {
    var titleSearch = (title as string).trim().toLocaleLowerCase().replace(" le ", " ").replace(" la ", " ").replace(" de ", " ")
    .replace(" en ", " ").replace("d'","");

    var citySearch = (city as string).trim().toLocaleLowerCase(); 

    if(!this.isValueNotNullOrEmpty(titleSearch) && !this.isValueNotNullOrEmpty(citySearch))
    {
      return this.getJobs();
    }
    else if(!this.isValueNotNullOrEmpty(titleSearch) && this.isValueNotNullOrEmpty(citySearch))
    {
      return this.db.collection(this.basePath, ref => ref.where("city_lowercase", "==", citySearch)).snapshotChanges();
    }
    else
    {
      var search = (titleSearch.concat(" ").concat(citySearch)).trim();
      
      console.log(search);

      return this.db.collection(this.basePath, ref => ref.where("keywords", "array-contains", search)).snapshotChanges(); 
    }
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

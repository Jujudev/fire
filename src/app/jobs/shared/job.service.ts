import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Job } from '../../models/job.model';
import { Company } from 'src/app/models/company.model';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  private jobsBasePath : string = 'jobs';
  private usersJobsBasePath : string = 'users_jobs';
  selectedJob: Job = new Job();
  postedJobList : Observable<any> = new Observable<any>();

  constructor(private db :AngularFirestore) { }
  
  getCompanyJobs(companyUid:string) {
    return this.db.collection(this.jobsBasePath, ref => ref.where("companyUid", "==", companyUid)).snapshotChanges();
  } 

  getJob(jobKey){
    return this.db.collection(this.jobsBasePath).doc(jobKey).snapshotChanges();
  }

  getCompany(companyKey : string) {
    return this.db.collection('companies').doc(companyKey).snapshotChanges();
  }

  updateJob(jobKey, value){
    return this.db.collection(this.jobsBasePath).doc(jobKey).set(value);
  }

  deleteJob(jobKey){
    return this.db.collection(this.jobsBasePath).doc(jobKey).delete();
  }

  getJobs(catKey?:string, contracttypeKey?:string){
    let cat = ((catKey !== undefined)) ? catKey : '';
    let contracttype = ((contracttypeKey !== undefined)) ? contracttypeKey : '';
    let keySearch : string = cat.concat(contracttype);
    return this.db.collection(this.jobsBasePath).snapshotChanges();
  }

  getJobsByCityAndTitle(city, key, catKey?:string, contracttypeKey?:string)
  {
    console.log(key);
    console.log(city);
    if(!this.isNotNullOrEmpty(key) && !this.isNotNullOrEmpty(city))
    {
      return this.getJobs(catKey, contracttypeKey);
    }
    else if (this.isNotNullOrEmpty(key) && !this.isNotNullOrEmpty(city))
    {
      return this.searchJob(key,catKey, contracttypeKey);
    }
    else if (!this.isNotNullOrEmpty(key) && this.isNotNullOrEmpty(city))
    {
      return this.searchJobsByCity(city, catKey, contracttypeKey);
    }

    return this.searchJob(key + ' ' + city, catKey, contracttypeKey);
  }

    searchJob(searchValue, catKey?:string, contracttypeKey?:string){
    let cat = ((catKey !== undefined)) ? catKey : '';
    let contracttype = ((contracttypeKey !== undefined)) ? contracttypeKey : '';
    let keySearch : string = cat.concat(contracttype);
    var textSearch = (searchValue as string).toLowerCase();
    return this.db.collection(this.jobsBasePath, ref => ref
      .where("keywords", "array-contains", textSearch)).snapshotChanges()
  }

  searchJobsByCity(searchValue, catKey?:string, contracttypeKey?:string){
    let cat = ((catKey !== undefined)) ? catKey : '';
    let contracttype = ((contracttypeKey !== undefined)) ? contracttypeKey : '';
    let keySearch : string = cat.concat(contracttype);
    return this.db.collection(this.jobsBasePath, ref => ref.where("city_lowercase", "==", searchValue)).snapshotChanges();
  }

  getUserPostLinks(userUid)
  {
    console.log('getUserPostLinks:'+userUid)
    return this.db.collection(this.usersJobsBasePath, ref => ref.where("userUid", "==", userUid)).snapshotChanges();
  }
  
  getPostedJobs(jobsIds:string[]){
    console.log('getPostedJobs');
    console.log(jobsIds);
    if(jobsIds === undefined || jobsIds.length === 0)
    {
      console.log('nada');
      return new Observable<any[]>();
    }
    else
    {
      return this.db.collection(this.jobsBasePath, ref => ref.where("uid", "in", jobsIds)).snapshotChanges();
    }
  }
  
  insertJob(job, company:Company){
    return this.db.collection(this.jobsBasePath).add({
      title : job.title,
      description1 : job.description1,
      description2 : job.description2,
      salary: job.salary,
      publishDate : Date.now(),
      contractType: job.contractType,
      country: job.country,
      city: job.city,
      email: job.email,
      category: job.category
    }).then(
      (insertedJob) => {
        console.log(insertedJob);           
        insertedJob.update({
          uid : insertedJob.id,
          companyUid: company.uid,
          companyName: company.name,
        })
      }).catch(
          (err) => {
            console.log(err);
          }
      );
  }

  applyJob(user_job)
  {
    console.log('Apply job');
    this.db.collection(this.usersJobsBasePath, ref => ref.where("userUid", "==", user_job.userUid).where("jobUid", "==", user_job.jobUid)).get().subscribe(snap => {
      if (snap.empty) {
        return this.db.collection('users_jobs').add({
          userUid : user_job.userUid,
          jobUid : user_job.jobUid,
          jobEmail : user_job.jobEmail,
          jobTitle : user_job.jobTitle,
          postDate : Date.now()
        });
      }
    });
  }

  isNotNullOrEmpty(key : any)
  {
    return (typeof key!='undefined' && key);
  }
}

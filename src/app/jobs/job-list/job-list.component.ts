import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { Job } from '../../models/job.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import * as StaticData from 'src/app/shared/staticData';
import { AuthService } from '../../authentification/services/auth.service';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobList : Observable<any> = new Observable<any>();
  jobsCount : number = 0;

  searchDomainValue: string = '';
  cities = StaticData.StaticDataClass.cities;
  categories = StaticData.StaticDataClass.jobcategories;
  contracttypes = StaticData.StaticDataClass.contracttypes;

  searchKeyValue: string = '';
  searchCity: StaticData.Region ;
  searchCategory : StaticData.Category;
  searchContract : StaticData.ContractType;


  constructor(private jobService : JobService, private route: ActivatedRoute, public authService: AuthService) {
    this.searchContract  = {value: '', viewValue: 'Tous les contrats'};
    this.searchCity  = {value: '', viewValue: 'Toutes les régions'};
    this.searchCategory = {value: '', viewValue: 'Tous les secteurs'};
   }
   

  ngOnInit() {
    this.route.queryParams.subscribe( (c) => {
      this.getJobsList(c['city'], c['key']);
    });
  }

  getJobsList(city:string, key:string, category?:string, contracttype?:string, complexsearch?:boolean)
  {
    this.jobsCount = 0;
    this.jobList = this.jobService.getJobsByCityAndTitle(city, key,  category, contracttype).pipe(
      map(changes => {
          return  changes.map(a => {
            const data = a.payload.doc.data() as Job;
            data.$id = a.payload.doc.id;
            data.display = true;
            if(!complexsearch)
            {
              this.jobsCount++;
              return data;
            }
            else
            {
              if((category.concat(contracttype) === data.keywordsbis.selectedcattype)
                  ||(category.concat(contracttype) === data.keywordsbis.selectedcat)
                  ||(category.concat(contracttype) === data.keywordsbis.selectedtype
                  || (category.concat(contracttype) === '')))
                {
                  this.jobsCount++;
                  return data;
                }
              else {
                let dummyjob = new Job();
                dummyjob.$id = "-1";
                dummyjob.display = false;
                return dummyjob;
              }
            }
          }
        )
      }));
  }

  isNotNullOrEmpty(key : string)
  {
    return (typeof key!='undefined' && key !== '' && key);
  }

  onSearchClick()
  {
    this.getJobsList(this.searchCity.value, this.searchKeyValue, this.searchCategory.value, this.searchContract.value, true);
  }

/*  const createKeywords = (jobtitle:string) => {
    const arrJob = new Array<string>();
    let curJob = '';
    jobtitle.split('').forEach(letter => {
        curJob += letter;
        arrJob.push(curJob);
    });
    arrJob.push('')

    return arrJob;
}*/

}

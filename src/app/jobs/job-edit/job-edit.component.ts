import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Company } from 'src/app/models/company.model';
import { Job } from 'src/app/models/job.model';
import { AuthService } from 'src/app/authentification/services/auth.service';
import * as StaticData from 'src/app/shared/staticData';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  jobList : Array<any>;
  company : Company;
  selectedJob : Job;
  categories = StaticData.StaticDataClass.jobcategories;
  contracttypes = StaticData.StaticDataClass.contracttypes;


  constructor(public jobService : JobService, private tostr : ToastrService, private authService: AuthService) { 
    if(authService)
    {
      authService.company$.subscribe( val => {
        
        this.company = val as Company;
        if((this.selectedJob) && (this.selectedJob.email === ''))
        {
          this.selectedJob.email = this.company.email;
        }
        this.resetForm();
        this.jobService.getCompanyJobs(this.company.uid)
        .subscribe(result => {
          this.jobList = result;
        });
      });
    }
  }

  ngOnInit() {
    this.resetSelectedJob();
  }

  onSubmit(value, jobForm : NgForm)
  {
    if(value.id === null)
    {
      console.log("start insert : ")
      this.jobService.insertJob(value, this.company);
    }
    else
    {
      console.log("start update : ")
      this.jobService.updateJob(value.id, value);
    }
      this.resetForm(jobForm);
      this.tostr.success('Job sumitted successfully', 'Soumission Offre');
  }

  resetForm(jobForm? : NgForm)
  {
    if(jobForm != null)
      jobForm.reset();
      this.resetSelectedJob();
  }
  
  resetSelectedJob()
  {
    this.selectedJob = {
      $id : null,
      title : '',
      description1 : '',
      description2 : '',
      salary: 0,
      publishDate: new Date(Date.now()),
      city: '',
      country:'',
      contractType: StaticData.StaticDataClass.contracttypes[0].value,
      companyId : null,
      companyName : null,
      email: '',
      category: '',
      keywordsbis: {                                
        selectedcat: '',
        selectedtype: '',
        selectedcattype: ''
    },
    display : false
    }
    if(this.company)
    {
      this.selectedJob.email = this.company.email;
    }
  }

  onEdit(job : Job, id : string){
    console.info('Editing job...', this.selectedJob.description1); 
    this.selectedJob = Object.assign({}, job);
    this.selectedJob.$id = id;
  }

  onDelete(key : string) {
    if(confirm('Are you sure you want to delete this record ?') == true)
    {
      this.jobService.deleteJob(key);
      this.tostr.warning("Job has been deleted successfully", "Job Register");
      this.resetForm();
    }
  }

}

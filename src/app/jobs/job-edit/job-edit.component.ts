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
  categories = StaticData.StaticDataClass.jobcategories;
  contracttypes = StaticData.StaticDataClass.contracttypes;


  constructor(public jobService : JobService, private tostr : ToastrService, private authService: AuthService) { 
    if(authService)
    {
      authService.company$.subscribe( val => {
        this.company = val as Company;
        this.resetForm();
        this.jobService.getCompanyJobs(this.company.uid)
        .subscribe(result => {
          this.jobList = result;
        });
      });

    }
  }

  ngOnInit() {

  }

  onSubmit(value, jobForm : NgForm)
  {
    if(value.id === null)
    {
      this.jobService.insertJob(value, this.company);
    }
    else
    {
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
    this.jobService.selectedJob = {
      $id : null,
      title : '',
      description1 : '',
      description2 : '',
      salary: 0,
      publishDate: new Date(Date.now()),
      city: '',
      country:'',
      contractType: 'CDI',
      companyId : null,
      companyName : null,
      email: '',
      category: ''
    }
  }

  onEdit(job : Job, id : string){
    console.info('Editing job...', id); 
    this.jobService.selectedJob = Object.assign({}, job);
    this.jobService.selectedJob.$id = id;
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

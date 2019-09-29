import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Company } from 'src/app/models/company.model';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  jobList : Array<any>;
  
  constructor(private jobService : JobService, private tostr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.jobService.getCompanyJobs()
    .subscribe(result => {
      this.jobList = result;
    });
    

  }

  onSubmit(value, jobForm : NgForm)
  {
    if(value.id == null)
    {
      console.warn('value id == null');
      console.warn('insert', value );

      this.jobService.insertJob(value);
    }
    else
    {
      this.jobService.updateJob(value.id, value);
    }
      this.resetForm(jobForm);
      this.tostr.success('Job sumitted successfully', 'Job Register');
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

import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Job } from '../../models/job.model';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor(private jobService : JobService, private tostr : ToastrService) { }

  ngOnInit() {
    this.jobService.getJobs();
    this.resetForm();
  }

  onSubmit(value, jobForm : NgForm)
  {
    console.log('selectedjob:',this.jobService.selectedJob);
    if(value.id == null)
    {
      console.log('insert new job');
      this.jobService.insertJob(value, null);
    }
    else
    {
      console.log('update job');

      this.jobService.updateJob(value.id, value);
    }
      this.resetForm(jobForm);
      this.tostr.success('Job sumitted successfully', 'Job Register');
  }

  resetForm(jobForm? : NgForm)
  {
    if(jobForm != null)
      jobForm.reset();
    this.jobService.selectedJob = {
      $id : null,
      title : '',
      description1 : '',
      description2 : '',
      salary: 0,
      city: '',
      country: '',
      contractType: '',
      companyId: null,
      companyName: '',
      publishDate: new Date(Date.now()),
      email: '',
      category: ''
    }
  }
}

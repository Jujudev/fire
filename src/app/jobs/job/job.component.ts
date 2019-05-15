import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor(private jobService : JobService, private tostr : ToastrService) { }

  ngOnInit() {
    this.jobService.getData();
    this.resetForm();
  }

  onSubmit(jobForm : NgForm)
  {
    if(jobForm.value.$key == null)
    {
      this.jobService.insertJob(jobForm.value);
    }
    else
    {
      this.jobService.updateJob(jobForm.value);
    }
      this.resetForm(jobForm);
      this.tostr.success('Job sumitted successfully', 'Job Register');
  }

  resetForm(jobForm? : NgForm)
  {
    if(jobForm != null)
      jobForm.reset();
    this.jobService.selectedJob = {
      $key : null,
      title : '',
      description : '',
      salary: 0,
      publishDate: new Date(Date.now())
    }
  }


}

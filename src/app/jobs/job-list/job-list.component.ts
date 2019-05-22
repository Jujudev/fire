import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { Job } from '../shared/job.model';
import { ToastrService } from 'ngx-toastr';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobList : Array<any>;

  constructor(private jobService : JobService, private tostr : ToastrService) { }

  ngOnInit() {
    this.jobService.getJobs()
    .subscribe(result => {
      this.jobList = result;
    });
  }

  onEdit(job : Job, id : string){
    console.info('Editing job...', id)
    this.jobService.selectedJob = Object.assign({}, job);
    this.jobService.selectedJob.$id = id;
  }

  onDelete(key : string) {
    if(confirm('Are you sure you want to delete this record ?') == true)
    {
      this.jobService.deleteJob(key);
      this.tostr.warning("Job has been deleted successfully", "Job Register");
    }
  }

  getWrappedResult(result : DocumentChangeAction<{}>[])
  {
    result.forEach(element => {
      var y = element.payload.doc.data();
      y["id"] = element.payload.doc.id;
      
      this.jobList.push(y as Job);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/job.service';
import { Job } from '../shared/job.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobList : Job[];

  constructor(private jobService : JobService, private tostr : ToastrService) { }

  ngOnInit() {
    var x = this.jobService.getData();
    x.snapshotChanges().subscribe(item => {
      this.jobList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.jobList.push(y as Job);
      });
    });
  }

  onEdit(job : Job){
    console.info('Editing job...')
    this.jobService.selectedJob = Object.assign({}, job);
  }

  onDelete(key : string) {
    if(confirm('Are you sure you want to delete this record ?') == true)
    {
      this.jobService.deleteJob(key);
      this.tostr.warning("Job has been deleted successfully", "Job Register");
    }
  }

}

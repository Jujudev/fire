import { Component, OnInit,Input } from '@angular/core';
import { Job } from '../../models/job.model';


@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {

  @Input() job: Job;
  constructor() { }

  ngOnInit() {
  }

}

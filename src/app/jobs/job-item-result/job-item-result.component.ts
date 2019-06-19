import { Component, OnInit,Input } from '@angular/core';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-item-result',
  templateUrl: './job-item-result.component.html',
  styleUrls: ['./job-item-result.component.scss']
})
export class JobItemResultComponent implements OnInit {

  @Input() job: Job;

  constructor() { }

  ngOnInit() {
  }

}

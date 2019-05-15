import { Component, OnInit } from '@angular/core';
import { JobService } from './shared/job.service'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  providers : [JobService]
})
export class JobsComponent implements OnInit {

  constructor(private jobService : JobService) { }

  ngOnInit() {
  }

}

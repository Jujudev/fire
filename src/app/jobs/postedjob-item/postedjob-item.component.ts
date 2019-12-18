import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-postedjob-item',
  templateUrl: './postedjob-item.component.html',
  styleUrls: ['./postedjob-item.component.scss']
})
export class PostedjobItemComponent implements OnInit {
  
  @Input() job: Job;
  constructor() { }

  ngOnInit() {
  }

}

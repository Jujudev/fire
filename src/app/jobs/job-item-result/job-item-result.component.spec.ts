import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemResultComponent } from './job-item-result.component';

describe('JobItemResultComponent', () => {
  let component: JobItemResultComponent;
  let fixture: ComponentFixture<JobItemResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobItemResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

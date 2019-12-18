import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedjobItemComponent } from './postedjob-item.component';

describe('PostedjobItemComponent', () => {
  let component: PostedjobItemComponent;
  let fixture: ComponentFixture<PostedjobItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedjobItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedjobItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

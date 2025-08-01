import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourtsComponent } from './view-courts.component';

describe('ViewCourtsComponent', () => {
  let component: ViewCourtsComponent;
  let fixture: ComponentFixture<ViewCourtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCourtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

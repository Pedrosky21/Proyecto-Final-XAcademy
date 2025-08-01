import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMatchesComponent } from './explore-matches.component';

describe('ExploreMatchesComponent', () => {
  let component: ExploreMatchesComponent;
  let fixture: ComponentFixture<ExploreMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

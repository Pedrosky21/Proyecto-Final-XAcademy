import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseMatchesComponent } from './browse-matches.component';

describe('BrowseMatchesComponent', () => {
  let component: BrowseMatchesComponent;
  let fixture: ComponentFixture<BrowseMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

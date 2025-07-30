import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitateClubComponent } from './habilitate-club.component';

describe('HabilitateClubComponent', () => {
  let component: HabilitateClubComponent;
  let fixture: ComponentFixture<HabilitateClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabilitateClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabilitateClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborantinProfileComponent } from './laborantin-profile.component';

describe('LaborantinProfileComponent', () => {
  let component: LaborantinProfileComponent;
  let fixture: ComponentFixture<LaborantinProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaborantinProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaborantinProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
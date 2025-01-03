import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulationBoxComponent } from './consulation-box.component';

describe('ConsulationBoxComponent', () => {
  let component: ConsulationBoxComponent;
  let fixture: ComponentFixture<ConsulationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulationBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiDetailComponent } from './dpi-detail.component';

describe('DpiDetailComponent', () => {
  let component: DpiDetailComponent;
  let fixture: ComponentFixture<DpiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticViewComponent } from './diagnostic-view.component';

describe('DiagnosticViewComponent', () => {
  let component: DiagnosticViewComponent;
  let fixture: ComponentFixture<DiagnosticViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

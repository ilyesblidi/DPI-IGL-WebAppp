import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticBoxComponent } from './diagnostic-box.component';

describe('DiagnosticBoxComponent', () => {
  let component: DiagnosticBoxComponent;
  let fixture: ComponentFixture<DiagnosticBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

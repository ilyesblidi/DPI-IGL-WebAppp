import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiListComponent } from './dpi-list.component';

describe('DpiListComponent', () => {
  let component: DpiListComponent;
  let fixture: ComponentFixture<DpiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

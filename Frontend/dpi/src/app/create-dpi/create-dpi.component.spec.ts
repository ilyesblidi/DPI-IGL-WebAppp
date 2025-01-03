import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDpiComponent } from './create-dpi.component';

describe('CreateDpiComponent', () => {
  let component: CreateDpiComponent;
  let fixture: ComponentFixture<CreateDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

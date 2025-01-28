import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologueProfileComponent } from './radiologue-profile.component';

describe('RadiologueProfileComponent', () => {
  let component: RadiologueProfileComponent;
  let fixture: ComponentFixture<RadiologueProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiologueProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologueProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
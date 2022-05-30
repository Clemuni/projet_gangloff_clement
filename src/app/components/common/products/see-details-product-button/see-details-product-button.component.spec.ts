import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDetailsProductButtonComponent } from './see-details-product-button.component';

describe('SeeDetailsProductButtonComponent', () => {
  let component: SeeDetailsProductButtonComponent;
  let fixture: ComponentFixture<SeeDetailsProductButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeDetailsProductButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeDetailsProductButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

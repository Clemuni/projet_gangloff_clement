import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProductButtonComponent } from './remove-product-button.component';

describe('RemoveProductButtonComponent', () => {
  let component: RemoveProductButtonComponent;
  let fixture: ComponentFixture<RemoveProductButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveProductButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProductButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

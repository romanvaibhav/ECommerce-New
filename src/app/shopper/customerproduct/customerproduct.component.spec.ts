import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerproductComponent } from './customerproduct.component';

describe('CustomerproductComponent', () => {
  let component: CustomerproductComponent;
  let fixture: ComponentFixture<CustomerproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

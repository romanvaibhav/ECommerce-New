import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerorderComponent } from './sellerorder.component';

describe('SellerorderComponent', () => {
  let component: SellerorderComponent;
  let fixture: ComponentFixture<SellerorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

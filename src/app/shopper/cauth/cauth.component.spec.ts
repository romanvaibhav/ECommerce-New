import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauthComponent } from './cauth.component';

describe('CauthComponent', () => {
  let component: CauthComponent;
  let fixture: ComponentFixture<CauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

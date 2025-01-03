import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdComponent } from './edit-prod.component';

describe('EditProdComponent', () => {
  let component: EditProdComponent;
  let fixture: ComponentFixture<EditProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistAdminComponent } from './pricelist-admin.component';

describe('PricelistAdminComponent', () => {
  let component: PricelistAdminComponent;
  let fixture: ComponentFixture<PricelistAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PricelistAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricelistAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeDashboardComponent } from './qr-code-dashboard.component';

describe('QrCodeDashboardComponent', () => {
  let component: QrCodeDashboardComponent;
  let fixture: ComponentFixture<QrCodeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrCodeDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrCodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

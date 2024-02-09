import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeCreatePdfComponent } from './qr-code-create-pdf.component';

describe('QrCodeCreatePdfComponent', () => {
  let component: QrCodeCreatePdfComponent;
  let fixture: ComponentFixture<QrCodeCreatePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrCodeCreatePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrCodeCreatePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

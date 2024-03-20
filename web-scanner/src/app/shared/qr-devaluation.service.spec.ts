import { TestBed } from '@angular/core/testing';

import { QrDevaluationService } from './qr-devaluation.service';

describe('QrDevaluationService', () => {
  let service: QrDevaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrDevaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

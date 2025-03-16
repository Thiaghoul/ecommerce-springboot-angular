import { TestBed } from '@angular/core/testing';

import { PayMoreGetLessFormService } from './pay-more-get-less-form.service';

describe('PayMoreGetLessFormService', () => {
  let service: PayMoreGetLessFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayMoreGetLessFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

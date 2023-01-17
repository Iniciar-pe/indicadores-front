import { TestBed } from '@angular/core/testing';

import { AppmainappsecommerceService } from './appmainappsecommerce.service';

describe('AppmainappsecommerceService', () => {
  let service: AppmainappsecommerceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppmainappsecommerceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

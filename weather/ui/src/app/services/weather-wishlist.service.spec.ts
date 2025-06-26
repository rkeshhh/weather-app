import { TestBed } from '@angular/core/testing';

import { WeatherWishlistService } from './weather-wishlist.service';

describe('WeatherWishlistService', () => {
  let service: WeatherWishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherWishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoEffectsService } from './todo-effects.service';

describe('Service: TodoEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoEffectsService]
    });
  });

  it('should ...', inject([TodoEffectsService], (service: TodoEffectsService) => {
    expect(service).toBeTruthy();
  }));
});

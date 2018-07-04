import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';
import { MockReactiveFormsElement } from './mock-reactive-forms-element.mock';

@Component({
  selector: 'mat-select', // match the selector to the element we are mocking
  template: '<ng-content></ng-content>', // add ng content to render the inner md-options elements
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockMdSelectComponent),
      multi: true
    }
  ]
})
export class MockMdSelectComponent extends MockReactiveFormsElement { }

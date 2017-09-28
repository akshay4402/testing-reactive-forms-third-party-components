import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';
import { MockReactiveFormsElement } from './mock-reactive-forms-element.mock';

@Component({
  selector: 'md-select',
  template: '<p>mock md select</p>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockMdSelectComponent),
      multi: true
    }
  ]
})
export class MockMdSelectComponent extends MockReactiveFormsElement { }

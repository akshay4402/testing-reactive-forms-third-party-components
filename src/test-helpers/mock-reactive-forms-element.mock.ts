import {ControlValueAccessor} from '@angular/forms';

export class MockReactiveFormsElement implements ControlValueAccessor {
  propagateChange = (_: any) => {};
  setTouched = (_: any) => {};

  writeValue(value: any) { }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.setTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {}
}

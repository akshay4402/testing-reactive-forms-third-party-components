import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFormComponent } from './demo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockMdSelectComponent } from '../../test-helpers/mock-md-select.mock';

describe('DemoFormComponent', () => {

  function setup() {

    TestBed.configureTestingModule({
      declarations: [
        DemoFormComponent,
        MockMdSelectComponent
      ],
      imports: [ ReactiveFormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    const fixture: ComponentFixture<DemoFormComponent> = TestBed.createComponent(DemoFormComponent);

    fixture.detectChanges();
    const component: DemoFormComponent = fixture.componentInstance;
    return {fixture, component};
  }

  it('should create', () => {
    const {component} = setup();
    expect(component).toBeTruthy();
  });
});

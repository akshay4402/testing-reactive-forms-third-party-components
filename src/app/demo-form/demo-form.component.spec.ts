import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFormComponent } from './demo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockMdSelectComponent } from '../../test-helpers/mock-md-select.mock';
import { By } from '@angular/platform-browser';
import { INVALID } from '@angular/forms/src/model';
import { WarriorFormService } from '../warrior-form.service';

describe('DemoFormComponent', () => {

  function setup() {

    TestBed.configureTestingModule({
      declarations: [
        DemoFormComponent,
        MockMdSelectComponent
      ],
      providers: [
        {
          provide: WarriorFormService,
          useValue: jasmine.createSpyObj('WarriorFormService', ['submitToServer'])
        }
      ],
      imports: [ FormsModule, ReactiveFormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    const fixture: ComponentFixture<DemoFormComponent> = TestBed.createComponent(DemoFormComponent);

    fixture.detectChanges();
    const component: DemoFormComponent = fixture.componentInstance;

    const warriorFormService: WarriorFormService = TestBed.get(WarriorFormService);
    return {fixture, component, warriorFormService};
  }

  it('should update the form when you fill in the name field', () => {
    const {fixture, component} = setup();
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input');

    nameInput.value = 'Cameron';
    nameInput.dispatchEvent(new Event('input'));

    expect(component.warriorForm.value.name).toEqual('Cameron');
  });

  it('should update the form when you fill in the type "select" field', () => {
    const {fixture, component} = setup();
    const typeSelect: MockMdSelectComponent = fixture.debugElement.query(By.css('md-select')).componentInstance;

    typeSelect.propagateChange('Ninja');
    expect(component.warriorForm.value.type).toEqual('Ninja');
  });

  it('should bind type array to the md-options in the view', () => {
    const {fixture} = setup();
    const options: NodeList = fixture.nativeElement.querySelectorAll('md-option');

    const results = [];
    // use a loop as NodeLists do not support map
    for (let i = 0; i <  options.length; i++) {
      results.push(options[i].textContent);
    }

    expect(results).toEqual(['Pirate', 'Ninja', 'Robot']);
  });

  it('should not submit the form when you click submit and values have not been filled in', () => {
    const {fixture, component, warriorFormService} = setup();


    const submitButton = fixture.nativeElement.querySelector('button');
    submitButton.dispatchEvent(new Event('click'));

    expect(component.warriorForm.status).toEqual('INVALID');
    expect(warriorFormService.submitToServer).not.toHaveBeenCalled();
  });

  it('should submit the form when you click submit and values have been filled in', () => {
    const {fixture, component, warriorFormService} = setup();
    const setValue = {
      name: 'Cameron',
      type: 'Ninja'
    };
    component.warriorForm.setValue(setValue);

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    submitButton.click();

    fixture.detectChanges();
    expect(warriorFormService.submitToServer).toHaveBeenCalledWith(setValue);
  });

});


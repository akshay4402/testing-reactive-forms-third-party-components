import {DemoFormComponent} from './demo-form.component';
import {WarriorFormService} from '../warrior-form.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatSelect, MatSelectModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MockComponent, MockedComponent} from 'ng-mocks';

// type MockedComponent<T> = T & {
//   __simulateChange(value: any): void;
//   __simulateTouch(): void;
// };

describe('DemoFormComponent', () => {
  describe('Without Mocks', () => {
    function vanillaSetup() {
      TestBed.configureTestingModule({
        declarations: [
          DemoFormComponent,
        ],
        providers: [
          {
            provide: WarriorFormService,
            useValue: jasmine.createSpyObj('WarriorFormService', ['submitToServer'])
          }
        ],
        imports: [
          ReactiveFormsModule,
          MatSelectModule,
          MatInputModule,
          NoopAnimationsModule
        ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA]
      });

      const fixture: ComponentFixture<DemoFormComponent> = TestBed.createComponent(DemoFormComponent);

      fixture.detectChanges();
      const component: DemoFormComponent = fixture.componentInstance;

      const warriorFormService: WarriorFormService = TestBed.get(WarriorFormService);
      const overlayContainer = TestBed.get(OverlayContainer);
      return {fixture, component, warriorFormService, overlayContainer};
    }

    it('should update the form when you fill in the type "select" field', fakeAsync(() => {
      const {fixture, component} = vanillaSetup();
      const typeSelect = fixture.debugElement.query(By.css('mat-select'));
      const typeSelectEl = typeSelect.nativeElement;

      typeSelectEl.click();
      fixture.detectChanges();
      flush();

      const options = document.querySelectorAll<HTMLElement>('mat-option');
      options[1].click();

      expect(component.warriorForm.value.type).toEqual('Ninja');
    }));

    it('should bind type array to the mat-option in the view a', fakeAsync(() => {
      const {fixture, overlayContainer} = vanillaSetup();

      const typeSelect = fixture.debugElement.query(By.css('mat-select'));
      const typeSelectEl = typeSelect.nativeElement;

      typeSelectEl.click();
      fixture.detectChanges();
      flush();

      const overlayContainerElement = overlayContainer.getContainerElement();
      const options = overlayContainerElement.querySelectorAll('mat-option') as HTMLElement[];
      const results = [];

      const whitespace = new RegExp(/\s/g);
      for (let i = 0; i <  options.length; i++) {
        results.push(options[i].innerText.replace(whitespace, ''));
      }

      expect(results).toEqual(['Pirate', 'Ninja', 'Robot']);
      overlayContainer.ngOnDestroy();
    }));

    runCommonTests(vanillaSetup);
  });

  describe('With Mocks', () => {
      function mocksSetup() {
        TestBed.configureTestingModule({
          declarations: [
            DemoFormComponent,
            MockComponent(MatSelect)
          ],
          providers: [
            {
              provide: WarriorFormService,
              useValue: jasmine.createSpyObj('WarriorFormService', ['submitToServer'])
            }
          ],
          imports: [ ReactiveFormsModule, NoopAnimationsModule],
          schemas: [ CUSTOM_ELEMENTS_SCHEMA]
        });

        const fixture: ComponentFixture<DemoFormComponent> = TestBed.createComponent(DemoFormComponent);

        fixture.detectChanges();
        const component: DemoFormComponent = fixture.componentInstance;

        const warriorFormService: WarriorFormService = TestBed.get(WarriorFormService);
        return {fixture, component, warriorFormService};
      }

      it('should update the form when you fill in the type "select" field', () => {
        const {fixture, component} = mocksSetup();
        const typeSelect: MockedComponent<MatSelect> = fixture.debugElement.query(By.css('mat-select')).componentInstance;

        typeSelect.__simulateChange('Ninja');
        expect(component.warriorForm.value.type).toEqual('Ninja');
      });

      it('should bind type array to the mat-options in the view', () => {
        const {fixture} = mocksSetup();
        const options: NodeList = fixture.nativeElement.querySelectorAll('mat-option');

        const results = [];
        // use a loop as NodeLists do not support map
        for (let i = 0; i <  options.length; i++) {
          results.push(options[i].textContent);
        }
        expect(results).toEqual(['Pirate', 'Ninja', 'Robot']);
      });

      runCommonTests(mocksSetup);
  });
});

export function runCommonTests(setup) {
  it('should update the form when you fill in the name field', () => {
    const {fixture, component} = setup();
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input');

    nameInput.value = 'Cameron';
    nameInput.dispatchEvent(new Event('input'));

    expect(component.warriorForm.value.name).toEqual('Cameron');
  });


  it('should not submit the form when you click submit and values have not been filled in', () => {
    const {fixture, component, warriorFormService} = setup();

    const submitButton = fixture.nativeElement.querySelector('button');
    submitButton.click();

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
}

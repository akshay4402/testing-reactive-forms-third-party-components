# Shallow testing Reactive Forms when using third party components (Angular Materials)

To fully benefit from this article you should already be familiar with Angular, Reactive Forms, Testing and Shallow vs Deep testing.

- Add link to Reactive forms
- Add link to shallow testing
- Add link to testing

### A showcase of shallow testing a Reactive form that depends on Angular Materials

#### Background:

Components are composed of three major attributes: 

* The class we decorate
* The HTML template
* Styles (CSS) inline

When testing we can unit test the class in isolation, however I prefer to also test the HTML bindings, and the CSS. 

I feel the HTML bindings and the CSS are core parts of the component, a unit test that allows you to break the component by changing the template, while still being green (passing) in your CI system, is not particularly valuable.

The interface for your component is the HTML and CSS (if present) not just the class. This demo is just for the HTML and decorated Class (not CSS)

#### Our simple demo form (Using Angular Material)

```ts
@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DemoFormComponent),
      multi: true
    }
  ]
})
export class DemoFormComponent implements OnInit {

  public warriorForm: FormGroup;
  public types = [
    {value: 'Pirate'},
    {value: 'Ninja'},
    {value: 'Robot'}
  ];
  constructor(private fb: FormBuilder, private warriorFormService: WarriorFormService) { }

  ngOnInit() {
    this.warriorForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.warriorForm.valid) {
      this.warriorFormService.submitToServer(this.warriorForm.value);
    }
  }

}

```

```html
<h2>Create a Warrior</h2>
<form [formGroup]="warriorForm" (ngSubmit)="onSubmit()" novalidate>
  <md-form-field>
    <input mdInput placeholder="Name" formControlName="name">
  </md-form-field>
  <md-select placeholder="Type" formControlName="type">
    <md-option *ngFor="let type of types" [value]="type.value">{{type.value}}</md-option>
  </md-select>
  <button md-button color="primary" type="submit">Submit</button>
</form>
```

#### Custom Element Schema 

While we could test this component by providing the Angular Materials modules (MdSelect, MdInput), they instantiate a lot of sub-components, potentially slowing down our unit tests and requiring change detection cycles.

As Angular Materials is compatible with Reactive forms (which we are using), it must be implementing the ControlValueAccessor interface, so instead of providing the real Material Select Component we can check that it's bound correctly with a simpler re-usable mock. 

##### Base Class 

This base class could be used to mock any Reactive Form element

```ts
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

```

##### Mock MdSelect

```ts
@Component({
  selector: 'md-select', // match the selector to the element we are mocking
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
```

#### TestBed Configuration

Now we can just provide the MockMdSelectComponent. We don't need to mock the Input component as Angular Materials just decorates it.

```ts
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
```

### Simpler testing

Now we can grab the component instance of the md-select and call propagateChange('Ninja') verifying that our reactive forms binding is working correctly without having to instantiate the entire MdSelect component, click the select, select the item and detectChanges. 

```ts
    const typeSelect: MockMdSelectComponent = fixture.debugElement.query(By.css('md-select')).componentInstance;
    typeSelect.propagateChange('Ninja');
    expect(component.warriorForm.value.type).toEqual('Ninja');
```

### Now checkout the demo built with Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

* `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
* `ng test` to run the unit tests.
* WallabyJS is also configured




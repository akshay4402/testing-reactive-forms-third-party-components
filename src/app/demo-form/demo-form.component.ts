import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.warriorForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.warriorForm.valid) {
      this.callServiceMethod(this.warriorForm.value);
    }
  }

  // in a real app this would be a service function we inject
  callServiceMethod(value: {name: string, type: string}) {
    console.log('Submitted form with value:', value);
  }

}

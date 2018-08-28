import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { WarriorFormService } from '../warrior-form.service';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
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

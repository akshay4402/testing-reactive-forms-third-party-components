import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdInputModule, MdSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { WarriorFormService } from './warrior-form.service';

@NgModule({
  declarations: [
    AppComponent,
    DemoFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // Forms module
    MdInputModule, // Materials components in use
    MdSelectModule,
    MdButtonModule
  ],
  providers: [
    WarriorFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

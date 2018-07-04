import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { WarriorFormService } from './warrior-form.service';
import { MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DemoFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // Forms module
    MatInputModule, // Materials components in use
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    WarriorFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

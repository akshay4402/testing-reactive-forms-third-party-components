import { Injectable } from '@angular/core';

@Injectable()
export class WarriorFormService {

  constructor() { }

  public submitToServer(value: any) {
    console.log(value);
  }
}

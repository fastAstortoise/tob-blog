---
title: Angular forms validate password
date: "2021-04-06T16:08:00.284Z"
tags:
- angular
- validators
- formGroup
---

# How to Validate fields in angular

Angular supports both Sync validation and async validation. Angular has built-in set of commonly user validators and is available as static methods on `Validator` via `@angular/forms`.


```ts
//app.service.ts
import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';

  // from angular utilties
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function doesPassMatch(fg: FormGroup): ValidationErrors | null { //(4)
  const actual = fg.get('actual');
  const confirm = fg.get('confirm');
  if (isEmptyInputValue(actual) && isEmptyInputValue(confirm)) { // (5)
    return null;
  }
  return actual.value === confirm.value ? null : {
    msg: `Password doesn't match`
  };
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private fb: FormBuilder) {
  }

  profileForm() {
    return this.fb.group({  //(1)
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: this.fb.group({  //(2)
        actual: ['', [Validators.required]],
        confirm: ['', [Validators.required]]
      }, {
        validators: [doesPassMatch] // (3)
      })
    });
  }
}
```

## Password validation explanation

1. We define `formGroup` using `FormBuilder` factory. It gives us all the controls and validators without writing the controls manually.
2. We create another `FormGroup` for password with two `FormControl`'s. We did this because we only want to trigger the change when one of the actual or confirm input field changes.
3. Add the validation function for password `FormGroup`. We technically could avoid creating password group, but it should be grouped as it is more clear and also we don't want to trigger the validator function for every field change rather we prefer to trigger it only when actual and confirm password changes.
4. Define the validator function which return either object or null based on the logic.
5. We don't want to validate fields if they are empty. We want to delicate that to `Validators.required` function, and it helps keep the logic separate and only focus on match validation.

> **NOTE** Validators can be hard, and sometimes it gets messier to manage all the messages and validators. So I created a small library that can help you to make this process streamlined and keep the logic and messages at one place and simple. Do checkout [NG-FORM-VALIDATOR](https://www.npmjs.com/package/@sahaaye/ng-form-validator)

## Installation and usage 
`npm i @sahaaye/ng-form-validator`. For usage documentation checkout [github repo](https://github.com/fastAstortoise/ng-form-validator).


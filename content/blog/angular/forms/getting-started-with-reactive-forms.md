---
title: Angular forms
date: "2021-01-10T22:12:03.284Z"
tags: 
    - angular
    - reactive forms
    - formbuilder
    - formcontrol
---

# Getting started with reactive forms

To get started make sure you have `ReactiveFormsModule` in your all modules. Below is the example of your app module.

> Make sure you import ReactiveFormsModule in all your modules including the child and lazy loaded modules.

```ts
//app.module.ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        //...
    ],
    imports: [
        BrowserModule,
        // other imports ...
        ReactiveFormsModule //(1)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
1. This will register the reactive forms module and will allow you to access in built directives and will expose `FormControl` instance to html and components.

you can use `FormControl` if you have few controls but if you want to see real power of angular you should use `FormBuilder` service. It will take away the overhead of creating `FormGroup` and creation of `FormControl` instance.

```ts
//to-do.component.ts
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {
  todoForm = this.fb.group({  //(2)
    type: [''],
    createdBy: [''],
    tasks: this.fb.group({
      title: [''],
      description: [''],
      status: [''],
    }),
  });
  
  constructor(private fb: FormBuilder) { } //(1)
  
  get tasksFa() { //(3)
    return this.todoForm.get('tasks') as FormArray;
  }
  
  onSave() { //(4)
    //save to server
  }
}
```
## Creating form model and accessing the form values and submit event.
1. We injected the `FormBuilder` service from `@angular/forms` module.
2. Created the instance of `FormBuilder` to create our `FormGroup`.
3. Getting tasks `FormArray` so that we can easily access it in the template.
4. On Submit we can do something with the data that we have in our `FormGroup`. For instance    saving it to the backend.

```html
//to-do.component.html
<form [formGroup]="todoForm" (ngSubmit)="onSave()"> //(1)
  <label>
    Title:
    <input type="text" formControlName="type">
  </label>
  <label>
    Description:
    <input type="text" formControlName="createdBy">
  </label>
  <div formArrayName="tasks"> //(2)
    <h3>Todos</h3>
    <div *ngFor="let task of tasks.controls; let taskInd=index"> //(3)
      <div formGroupName="taskInd"> //(4) 
        <label>
          Title:
          <input type="text" formControlName="title"> //(5)
        </label>
        <label>
          Description:
          <input type="text" formControlName="description">
        </label>
        <label>
          Status:
          <input type="text" formControlName="status">
        </label>
      </div>  
    </div>
  <button class="button" type="submit">Save</button> //(6)

</form>
```
## Accessing the nested `FormGroup`'s and  nested `Formcontrols` inside template using various form directives.
1. Using the `formGroup` directive to initialize and attach our model to the component and   also using `ngSubmit` event directive which will trigger our `onSave()` method when we hit Save button.
2. `formArrayName` directive will look for the `FormArray` in the parent `FormGroup` and will keep them in sync.
3. We use `ngFor` directive to loop through all the `FormArray` controls.
4. Using `formGroupName` directive to attach `FormGroups` inside `FormArray` and have access to `FormControls` by using `formControlName`.
5. Using `formControlName` directive which bind the `formControl` with form elements.
6. trigger native submit event on click which in turn will invoke angular's `ngSubmit` event.

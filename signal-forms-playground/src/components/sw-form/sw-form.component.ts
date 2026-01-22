import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface InterestData {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  age: FormControl<number | null>;
  subscribe: FormControl<boolean | null>;
}

@Component({
  selector: 'app-sw-form',
  imports: [ReactiveFormsModule],
  styleUrl: 'sw-form.component.scss',
  template: `
    <h2>Interest Form</h2>
    <form [formGroup]="interestForm" (submit)="onSubmit()">
      <div>
        <label>
          Name
          <input type="name" formControlName="name" />
        </label>
        @if (interestForm.controls.name.touched && interestForm.controls.name.invalid) {
          @if (interestForm.controls.name.errors?.['required']) {
            <div class="error">
              <span>Name is required</span>
            </div>
          }
        }
      </div>

      <div>
        <label>
          Email
          <input type="email" formControlName="email" />
        </label>
        @if (interestForm.controls.email.touched && interestForm.controls.email.invalid) {
          @if (interestForm.controls.email.errors?.['required']) {
            <div class="error">
              <span>Email is required</span>
            </div>
          }
          @if (interestForm.controls.email.errors?.['email']) {
            <div class="error">
              <span>Email is invalid</span>
            </div>
          }
        }
      </div>

      <div>
        <label>
          Age
          <input type="number" formControlName="age" />
        </label>
        @if (interestForm.controls.age.touched && interestForm.controls.age.invalid) {
          @if (interestForm.controls.age.errors?.['min']) {
            <div class="error">
              <span>Age must be positive</span>
            </div>
          }
        }
      </div>

      <div>
        <label>
          <input type="checkbox" formControlName="subscribe" />
          Subscribe me to all emails
        </label>
      </div>

      <button type="submit" [disabled]="interestForm.invalid">Submit</button>
    </form>
  `,
})
export class SwFormComponent {
  interestForm = new FormGroup<InterestData>({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0, [Validators.required, Validators.min(0)]),
    subscribe: new FormControl(false),
  });

  onSubmit() {
    if (this.interestForm.valid) {
      const submission = this.interestForm.value;
      console.log('Submitting: ', submission);
    }
  }
}

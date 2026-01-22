import { Component, signal } from '@angular/core';
import { email, form, FormField, min, required } from '@angular/forms/signals';

interface InterestData {
  name: string;
  email: string;
  age: number;
  subscribe: boolean;
}

@Component({
  selector: 'app-sw-form',
  imports: [FormField],
  styleUrl: 'sw-form.component.scss',
  template: `
    <h2>Interest Form</h2>
    <form (submit)="onSubmit()">
      <div>
        <label>
          Name
          <input type="name" [formField]="interestForm.name" />
        </label>
        @if (interestForm.name().touched() && interestForm.name().invalid()) {
          <div class="error">
            <span>{{ interestForm.name().errors()[0]?.message }}</span>
          </div>
        }
      </div>

      <div>
        <label>
          Email
          <input type="email" [formField]="interestForm.email" />
        </label>
        @if (interestForm.email().touched() && interestForm.email().invalid()) {
          <div class="error">
            <span>{{ interestForm.email().errors()[0]?.message }}</span>
          </div>
        }
      </div>

      <div>
        <label>
          Age
          <input type="number" [formField]="interestForm.age" />
        </label>
        @if (interestForm.age().touched() && interestForm.age().invalid()) {
          <div class="error">
            <span>{{ interestForm.age().errors()[0]?.message }}</span>
          </div>
        }
      </div>

      <div>
        <label>
          <input type="checkbox" [formField]="interestForm.subscribe" />
          Subscribe me to all emails
        </label>
      </div>

      <button type="submit" [disabled]="interestForm().invalid()">Submit</button>
    </form>
  `,
})
export class SwFormComponent {
  interestFormModel = signal<InterestData>({
    name: '',
    email: '',
    age: 0,
    subscribe: false,
  });

  interestForm = form(this.interestFormModel, (formField) => {
    required(formField.name, { message: 'Name is required' });
    required(formField.email, { message: 'Email is required' });
    email(formField.email, { message: 'Email must be valid' });
    required(formField.age, { message: 'Age is required' });
    min(formField.age, 0, { message: 'Age must be positive' });
  });

  onSubmit() {
    if (this.interestForm().valid()) {
      const submission = this.interestForm().value();
      console.log('Submitting: ', submission);
    }
  }
}

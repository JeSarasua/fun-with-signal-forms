import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

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
    <h2>Star wars character casting</h2>
    <form (submit)="onSubmit($event)">
      <div>
        <label>
          Name
          <input type="name" [formField]="interestForm.name" />
        </label>
        @if (interestForm.name().invalid() && interestForm.name().touched()) {
          <div class="error">
            @for (error of interestForm.name().errors(); track error.kind) {
              <span>{{ error.message }}</span>
            }
          </div>
        }
      </div>

      <div>
        <label>
          Email
          <input type="email" [formField]="interestForm.email" />
        </label>
        @if (interestForm.email().invalid() && interestForm.email().touched()) {
          <div class="error">
            @for (error of interestForm.email().errors(); track error.kind) {
              <span>{{ error.message }}</span>
            }
          </div>
        }
      </div>

      <div>
        <label>
          Age
          <input type="number" [formField]="interestForm.age" />
        </label>
        @if (interestForm.age().invalid() && interestForm.age().touched()) {
          @for (error of interestForm.age().errors(); track error.kind) {
            <div class="error">
              <span>{{ error.message }}</span>
            </div>
          }
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
  interestModel = signal<InterestData>({
    name: '',
    email: '',
    age: 0,
    subscribe: false,
  });

  interestForm = form(this.interestModel, (field) => {
    required(field.email, { message: 'Email is required' });
    required(field.name, { message: 'Name is required' });
    email(field.email, { message: 'Must be valid Email' });
    required(field.age, { message: 'Age is required' });
  });

  onSubmit(event: Event) {
    console.log('SUBMITTED!');
  }
}

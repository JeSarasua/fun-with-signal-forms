import { Component, signal } from '@angular/core';
import { QuantityStepperComponent } from '../quantity-stepper/quantity-stepper.component';
import { form, FormField, min, required } from '@angular/forms/signals';

@Component({
  selector: 'app-sw-form',
  imports: [QuantityStepperComponent, FormField],
  template: `
    <label for="qty">Quantity</label>
    <app-quantity-stepper id="qty" [formField]="cartForm.quantity" />
    <p>Value: {{ cartForm.quantity().value() }}</p>
    @if (cartForm.quantity().invalid()) {
      <div class="error">Quantity must be at least 1</div>
    }
  `,
})
export class SwFormComponent {
  model = signal({ quantity: 1 });
  cartForm = form(this.model, (schema) => {
    required(schema.quantity);
    min(schema.quantity, 1);
  });
}

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuantityStepperComponent } from '../quantity-stepper/quantity-stepper.component';

@Component({
  selector: 'app-sw-form',
  imports: [ReactiveFormsModule, QuantityStepperComponent],
  template: `
    <label for="qty">Quantity</label>
    <app-quantity-stepper id="qty" [formControl]="quantity" />
    <p>Value: {{ quantity.value }}</p>
    @if (quantity.invalid) {
      <div class="error">Quantity must be at least 1</div>
    }
  `,
})
export class SwFormComponent {
  quantity = new FormControl<number>(1, {
    nonNullable: true,
    validators: [Validators.min(1)],
  });
}

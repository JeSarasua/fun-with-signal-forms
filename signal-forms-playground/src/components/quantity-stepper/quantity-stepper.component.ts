import { Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-quantity-stepper',
  imports: [],
  template: `@let disabled = isDisabled();
    <div class="stepper" [class.is-disabled]="disabled">
      <button
        type="button"
        class="btn btn-minus"
        (click)="decrement()"
        [disabled]="disabled"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span
        class="qty"
        role="spinbutton"
        [attr.aria-valuenow]="value()"
        aria-valuemin="1"
        tabindex="0"
        >{{ value() }}</span
      >
      <button
        type="button"
        class="btn btn-plus"
        (click)="increment()"
        [disabled]="disabled"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div> `,
})
export class QuantityStepperComponent implements FormValueControl<number> {
  value = model(1);
  isDisabled = input(false);

  increment() {
    this.value.update((v) => v + 1);
  }

  decrement() {
    this.value.update((v) => Math.max(1, v - 1));
  }
}

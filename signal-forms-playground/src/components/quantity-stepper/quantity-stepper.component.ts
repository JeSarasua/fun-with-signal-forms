import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-quantity-stepper',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantityStepperComponent),
      multi: true,
    },
  ],
  imports: [],
  template: `@let disabled = isDisabled;
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
export class QuantityStepperComponent implements ControlValueAccessor {
  #value = signal(1);
  value = this.#value;
  isDisabled = false;

  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: number | null): void {
    this.#value.set(v ?? 1);
  }

  registerOnChange(fn: (v: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }

  protected increment() {
    this.#value.update((v) => {
      const n = v + 1;
      this.onChange(n);
      return n;
    });
  }

  protected decrement() {
    this.#value.update((v) => {
      const n = Math.max(1, v - 1);
      this.onChange(n);
      return n;
    });
  }
}

import {ControlValueAccessor, NgModel} from '@angular/forms';

export default abstract class Input implements ControlValueAccessor {
  protected abstract model: NgModel;
  private innerValue: any;

  private changeListener = [];
  private touchListener = [];

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changeListener.forEach(f => f(this.innerValue));
    }
  }

  touch() {
    this.touchListener.forEach(f => f());
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.changeListener.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touchListener.push(fn);
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalLimit'
})
export class DecimalLimitPipe implements PipeTransform {
  transform(value: number): string {
    // Round the value to one decimal place
    const roundedValue = Math.round(value * 10) / 10;
    // If roundedValue is a whole number, it returns the number as a string with no decimals
    // Otherwise, it returns the number as a string with 1 decimal place
    return roundedValue % 1 === 0 ? roundedValue.toString() : roundedValue.toFixed(1);
  }
}

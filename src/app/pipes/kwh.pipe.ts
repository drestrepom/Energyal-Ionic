import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'kwh'
})
export class KwhPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value < 0) {
            return `${value * 1000} Wh`;
        } else {
            return `${value} kWh`;
        }
    }
}

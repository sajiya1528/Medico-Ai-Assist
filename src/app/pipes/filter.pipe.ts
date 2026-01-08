import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../models/models';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Appointment[], status: string): Appointment[] {
        if (!items || !status) {
            return items;
        }
        return items.filter(item => item.status === status);
    }
}

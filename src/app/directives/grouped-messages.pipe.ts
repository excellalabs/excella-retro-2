import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message';

@Pipe({
    name: 'groupedMessagesPipe'
})

export class GroupedMessagesPipe implements PipeTransform {
    transform(messages: Message[], groupId: string): Message[] {
        return messages.filter(message => message.groupId === groupId);
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../models/group';
import { Message } from '../../models/message';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() groupName: string;
  @Input() groupId: string;
  @Input() messages: Message[];

  constructor() { }

  ngOnInit() { }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AngularFire, FirebaseObjectObservable } from '@angular/fire'

import { Group } from '../../models/group'
import { Message } from '../../models/message'

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  @Input() groupName: string
  @Input() groupId: string
  @Input() messages: Message[]
  @Input() enabledGroup: string
  @Input() allowAdminFunctions: boolean = false
  @Output() editingNotifier: EventEmitter<string> = new EventEmitter<string>()
  group: Group
  groupObjectObservable: FirebaseObjectObservable<Group>
  editMode: boolean

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const self = this
    this.groupObjectObservable = this.af.database.object('/groups/' + this.groupId)
    this.groupObjectObservable.subscribe(group => (self.group = group))
  }

  editGroupName(groupName: string) {
    this.group.name = groupName
    this.groupObjectObservable.update(this.group)
    this.editMode = false
    this.editingNotifier.emit('')
  }

  toggleEditing(groupName: string) {
    if (this.editMode) {
      this.editGroupName(groupName)
    } else {
      this.editMode = true
      this.editingNotifier.emit(this.groupId)
    }
  }
}

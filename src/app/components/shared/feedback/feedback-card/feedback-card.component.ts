import { Component, Input, OnInit } from '@angular/core'
import { AngularFire, FirebaseObjectObservable } from '@angular/fire'

import { Message } from '../../../../models/message'

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css'],
})
export class FeedbackCardComponent implements OnInit {
  @Input() feedback: Message
  @Input() enabledGroup: string
  messageObjectObservable: FirebaseObjectObservable<Message>
  inGroup: boolean
  constructor(private af: AngularFire) {}

  ngOnInit() {
    this.inGroup = this.feedback.groupId ? true : false
    this.messageObjectObservable = this.af.database.object(
      '/messages/' + this.feedback.$key
    )
  }

  addToGroup() {
    this.feedback.groupId = this.enabledGroup
    this.messageObjectObservable.update(this.feedback)
    this.inGroup = true
  }

  removeFromGroup() {
    this.feedback.groupId = ''
    this.messageObjectObservable.update(this.feedback)
    this.inGroup = false
  }
}

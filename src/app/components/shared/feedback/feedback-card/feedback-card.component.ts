import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../../models/message';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css']
})
export class FeedbackCardComponent implements OnInit {
  @Input() feedback: Message;

  constructor() { }

  ngOnInit() {
  }

}

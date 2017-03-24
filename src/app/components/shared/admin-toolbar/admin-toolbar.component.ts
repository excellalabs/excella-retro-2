import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';
import { Retro } from '../../../models/retro';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminToolbarComponent implements OnInit {
  @Input() retroObservable: FirebaseObjectObservable<Retro>;

  constructor() { }

  ngOnInit() {
  }

}

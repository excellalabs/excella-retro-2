import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ToolbarComponent implements OnInit {
  isDarkMode: boolean;
  body = document.getElementsByTagName('body')[0];
  darkModeClass = 'app-dark-theme';

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.checkDarkMode();
  }

  checkDarkMode() {
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
    this.isDarkMode === true ? this.addDarkModeClass() : this.removeDarkModeClass();
  }

  toggleDarkMode() {
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
    if (this.isDarkMode === true) {
      localStorage.setItem('isDarkMode', 'false');
      this.removeDarkModeClass();
    } else {
      localStorage.setItem('isDarkMode', 'true');
      this.addDarkModeClass();
    }
  }

  addDarkModeClass() {
    this.body.classList.add(this.darkModeClass);
  }

  removeDarkModeClass() {
    this.body.classList.remove(this.darkModeClass);
  }
}

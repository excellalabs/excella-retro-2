import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isDarkMode: boolean;
  user;
  body = document.getElementsByTagName('body')[0];
  darkModeClass = 'app-dark-theme';

  constructor(private localStorageService: LocalStorageService,
    private af: AngularFire,
    private router: Router) { }

  login() {
      this.af.auth.login();
    }

    logout() {
      this.af.auth.logout();
      this.router.navigateByUrl('');
    }

  ngOnInit() {
    this.checkDarkMode();
    this.af.auth.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
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

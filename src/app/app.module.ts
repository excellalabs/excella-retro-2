import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// TODO: Update with actual Firebase config
export const firebaseConfig = {
  apiKey: 'AIzaSyAjMVQvUS9_E_ckc_yT7siUhQKOnEgD8bs',
  authDomain: 'excella-retro-2.firebaseapp.com',
  databaseURL: 'https://excella-retro-2.firebaseio.com',
  storageBucket: 'excella-retro-2.appspot.com',
  messagingSenderId: '419643079193'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

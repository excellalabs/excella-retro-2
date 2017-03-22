// External imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalStorageModule } from 'angular-2-local-storage';
import 'hammerjs';

// Internal imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { RetroComponent } from './components/retro/retro.component';
import { SubmitFeedbackComponent } from './components/phaseSteps/submit-feedback/submit-feedback.component';
import { GroupFeedbackComponent } from './components/phaseSteps/group-feedback/group-feedback.component';
import { VoteFeedbackComponent } from './components/phaseSteps/vote-feedback/vote-feedback.component';
import { ChildComponentDirective } from './directives/child-component-directive';

export const firebaseConfig = {
  apiKey: 'AIzaSyAjMVQvUS9_E_ckc_yT7siUhQKOnEgD8bs',
  authDomain: 'excella-retro-2.firebaseapp.com',
  databaseURL: 'https://excella-retro-2.firebaseio.com',
  storageBucket: 'excella-retro-2.appspot.com',
  messagingSenderId: '419643079193'
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    RetroComponent,
    SubmitFeedbackComponent,
    ChildComponentDirective,
    GroupFeedbackComponent,
    VoteFeedbackComponent
  ],
  entryComponents: [
    SubmitFeedbackComponent,
    GroupFeedbackComponent,
    VoteFeedbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot(),
    FlexLayoutModule,
    LocalStorageModule.withConfig({
      prefix: 'excella-retro-2',
      storageType: 'localStorage'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

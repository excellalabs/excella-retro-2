// External imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ClipboardModule } from 'ngx-clipboard';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

import 'hammerjs';
import 'nanoid';

// Internal imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { RetroComponent } from './components/retro/retro.component';
import { JoinRetroFormComponent } from './components/join-retro-form/join-retro-form.component';
import { SubmitFeedbackComponent } from './components/phase-steps/submit-feedback/submit-feedback.component';
import { GroupFeedbackComponent } from './components/phase-steps/group-feedback/group-feedback.component';
import { VoteFeedbackComponent } from './components/phase-steps/vote-feedback/vote-feedback.component';
import { ChildComponentDirective } from './directives/child-component-directive';
import { AdminToolbarComponent } from './components/shared/admin-toolbar/admin-toolbar.component';
import { GroupedMessagesPipe } from './directives/grouped-messages.pipe';
import { GroupComponent } from './components/group/group.component';
import { CreateRetroFormComponent } from './components/create-retro-form/create-retro-form.component';
import { PhaseStepCardComponent } from './components/shared/phase-step/phase-step-card/phase-step-card.component';
import { PhaseStepHeaderComponent } from './components/shared/phase-step/phase-step-header/phase-step-header.component';
import { PhaseStepContentComponent } from './components/shared/phase-step/phase-step-content/phase-step-content.component';
import { FeedbackCardComponent } from './components/shared/feedback/feedback-card/feedback-card.component';
import { FeedbackContainerComponent } from './components/shared/feedback/feedback-container/feedback-container.component';
import { RetroSummaryComponent } from './components/retro-summary/retro-summary.component';
import { ChildComponentService } from './services/child-component.service';
import { RetroArchiveService } from './services/retro-archive.service';
import { EndRetroComponent } from './components/shared/end-retro/end-retro.component';
import { WindowService } from './services/window.service';
import { PhaseSummaryComponent } from './components/phase-steps/phase-summary/phase-summary.component';

// Dev Environment
// export const firebaseConfig = {
//   apiKey: 'AIzaSyAjMVQvUS9_E_ckc_yT7siUhQKOnEgD8bs',
//   authDomain: 'excella-retro-2.firebaseapp.com',
//   databaseURL: 'https://excella-retro-2.firebaseio.com',
//   storageBucket: 'excella-retro-2.appspot.com',
//   messagingSenderId: '419643079193'
// };

// Prod Envioronment
  export const firebaseConfig = {
    apiKey: 'AIzaSyC5r_KGRp4iDO8yS8kdYYnHa2HtMhxUYSI',
    authDomain: 'excella-retro.firebaseapp.com',
    databaseURL: 'https://excella-retro.firebaseio.com',
    projectId: 'excella-retro',
    storageBucket: 'excella-retro.appspot.com',
    messagingSenderId: '181908731323'
  };

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
  remember: 'default'
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    RetroComponent,
    JoinRetroFormComponent,
    SubmitFeedbackComponent,
    GroupFeedbackComponent,
    VoteFeedbackComponent,
    RetroSummaryComponent,
    ChildComponentDirective,
    AdminToolbarComponent,
    CreateRetroFormComponent,
    PhaseStepCardComponent,
    PhaseStepHeaderComponent,
    PhaseStepContentComponent,
    FeedbackCardComponent,
    FeedbackContainerComponent,
    GroupedMessagesPipe,
    GroupComponent,
    CreateRetroFormComponent,
    EndRetroComponent,
    PhaseSummaryComponent
  ],
  entryComponents: [
    JoinRetroFormComponent,
    CreateRetroFormComponent,
    SubmitFeedbackComponent,
    GroupFeedbackComponent,
    VoteFeedbackComponent,
    PhaseSummaryComponent,
    RetroSummaryComponent,
    EndRetroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    FlexLayoutModule,
    LocalStorageModule.withConfig({
      prefix: 'excella-retro-2',
      storageType: 'localStorage'
    }),
    ClipboardModule
  ],
  providers: [
    ChildComponentService,
    RetroArchiveService,
    WindowService,
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

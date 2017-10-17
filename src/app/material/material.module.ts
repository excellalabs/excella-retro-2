import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatTooltipModule, MatDialogModule, MatSnackBarModule,
  MatInputModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule, MatStepperModule, MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatTooltipModule, MatDialogModule, MatSnackBarModule,
    MatInputModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule, MatStepperModule, MatProgressBarModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatTooltipModule, MatDialogModule, MatSnackBarModule,
    MatInputModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule, MatStepperModule, MatProgressBarModule
  ],
  declarations: []
})
export class MaterialModule { }

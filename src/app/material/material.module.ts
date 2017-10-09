import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatTooltipModule, MatDialogModule, MatSnackBarModule,
  MatInputModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatTooltipModule, MatDialogModule, MatSnackBarModule,
    MatInputModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatTooltipModule, MatDialogModule, MatSnackBarModule,
    MatInputModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }

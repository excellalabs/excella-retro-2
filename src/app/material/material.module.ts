import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdTooltipModule, MdDialogModule, MdSnackBarModule,
  MdInputModule, MdIconModule, MdSidenavModule, MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdTooltipModule, MdDialogModule, MdSnackBarModule,
    MdInputModule, MdIconModule, MdSidenavModule, MdProgressSpinnerModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdTooltipModule, MdDialogModule, MdSnackBarModule,
    MdInputModule, MdIconModule, MdSidenavModule, MdProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }

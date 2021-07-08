import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from '../components/home/home.component'
import { RetroSummaryComponent } from '../components/retro-summary/retro-summary.component'
import { RetroComponent } from '../components/retro/retro.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'retro/:retroId', component: RetroComponent },
  { path: 'retro/:retroId/summary', component: RetroSummaryComponent },
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

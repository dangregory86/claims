import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClaimPage } from './new-claim.page';

const routes: Routes = [
  {
    path: '',
    component: NewClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClaimPageRoutingModule {}

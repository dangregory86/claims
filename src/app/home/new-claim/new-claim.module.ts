import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClaimPageRoutingModule } from './new-claim-routing.module';

import { NewClaimPage } from './new-claim.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	imports: [ CommonModule, ReactiveFormsModule, IonicModule, NewClaimPageRoutingModule, SharedModule ],
	declarations: [ NewClaimPage ]
})
export class NewClaimPageModule {}

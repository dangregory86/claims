import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClaimPageRoutingModule } from './new-claim-routing.module';

import { NewClaimPage } from './new-claim.page';

@NgModule({
	imports: [ CommonModule, FormsModule, IonicModule, NewClaimPageRoutingModule ],
	declarations: [ NewClaimPage ]
})
export class NewClaimPageModule {}

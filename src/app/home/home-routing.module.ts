import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
	{
		path: '',
		component: HomePage
	},
	{
		path: 'new-claim',
		loadChildren: () => import('./new-claim/new-claim.module').then((m) => m.NewClaimPageModule)
	},
	{
		path: 'receipt-detail/:receiptId',
		loadChildren: () => import('./receipt-detail/receipt-detail.module').then((m) => m.ReceiptDetailPageModule)
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class HomePageRoutingModule {}

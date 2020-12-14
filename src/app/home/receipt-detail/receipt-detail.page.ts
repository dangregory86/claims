import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Receipt } from 'src/app/models/receipt-model';
import { ReceiptService } from '../../services/receipt-service.service';

@Component({
	selector: 'app-receipt-detail',
	templateUrl: './receipt-detail.page.html',
	styleUrls: [ './receipt-detail.page.scss' ]
})
export class ReceiptDetailPage implements OnInit {
	receipt: Receipt;

	constructor(
		private receiptService: ReceiptService,
		private navCtrl: NavController,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('receiptId')) {
				this.navCtrl.navigateBack('/home');
				return;
			}
			const placeId = paramMap.get('receiptId');
			console.log(placeId);
			this.receipt = this.receiptService.getCurrentReceipt(placeId);
		});
	}
}

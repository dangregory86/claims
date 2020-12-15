import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Receipt } from '../../models/receipt-model';
import { ImageService } from '../../services/image-service.service';
import { ReceiptService } from '../../services/receipt-service.service';

@Component({
	selector: 'app-receipt-detail',
	templateUrl: './receipt-detail.page.html',
	styleUrls: [ './receipt-detail.page.scss' ]
})
export class ReceiptDetailPage implements OnInit, OnDestroy {
	receipt: Receipt;
	private receiptSub: Subscription;
	receiptImage: string;

	constructor(
		private receiptService: ReceiptService,
		private navCtrl: NavController,
		private activatedRoute: ActivatedRoute,
		private imageService: ImageService
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('receiptId')) {
				this.navCtrl.navigateBack('/home');
				return;
			}
			const placeId = paramMap.get('receiptId');
			this.receiptSub = this.receiptService.getCurrentReceipt(placeId).subscribe(async (receipt) => {
				this.receipt = receipt;
				this.receiptImage = (await this.imageService.loadSaved(receipt.imgSrc)).webviewPath;
			});
		});
	}

	ngOnDestroy() {
		if (this.receiptSub) {
			this.receiptSub.unsubscribe();
		}
	}
}

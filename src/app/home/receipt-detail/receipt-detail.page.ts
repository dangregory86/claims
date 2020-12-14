import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/models/receipt-model';
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
	receiptImage;

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
			console.log(placeId);
			this.receiptSub = this.receiptService.getCurrentReceipt(placeId).subscribe((receipt) => {
				this.receipt = receipt;
				console.log(receipt.imgSrc);
				this.receiptImage = this.imageService.getImageUrl(receipt.imgSrc);
			});
		});
	}

	ngOnDestroy() {
		if (this.receiptSub) {
			this.receiptSub.unsubscribe();
		}
	}
}

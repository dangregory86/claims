import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Receipt } from '../models/receipt-model';
import { ImageService } from '../services/image-service.service';
import { ReceiptService } from '../services/receipt-service.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit, OnDestroy {
	loadedReceipts: Receipt[] = [];
	total = 0;
	private receiptsSub: Subscription;

	constructor(private receiptService: ReceiptService, private imageService: ImageService) {}

	ngOnInit() {
		this.receiptService.getReceipts();
		this.receiptsSub = this.receiptService.receipts.subscribe(async (receipts) => {
			for (let r of receipts) {
				r.imgSrc.webviewPath = (await this.imageService.loadSaved(r.imgSrc)).webviewPath;
			}
			this.loadedReceipts = receipts;
			this.total = this.getTotalToClaim();
		});
	}

	getTotalToClaim() {
		let total = 0;
		for (let r of this.loadedReceipts) {
			total = total + r.amount;
		}
		return total;
	}

	delete(receipt, slidingItem: IonItemSliding) {
		this.receiptService.deleteSavedReceipt(receipt.id);
		slidingItem.close();
	}

	ngOnDestroy() {
		if (this.receiptsSub) {
			this.receiptsSub.unsubscribe();
		}
	}
}

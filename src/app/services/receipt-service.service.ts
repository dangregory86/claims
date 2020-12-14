import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt-model';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

const { Storage } = Plugins;

@Injectable({
	providedIn: 'root'
})
export class ReceiptService {
	private STORAGE_KEY: string = 'receipts-string';
	private _receipts = new BehaviorSubject<Receipt[]>([]);

	constructor() {}

	public async getReceipts() {
		this._receipts.next(await this.getSavedReceipts());
	}

	get receipts() {
		return this._receipts.asObservable();
	}

	public getCurrentReceipt(receiptId: string) {
		return this.receipts.pipe(
			take(1),
			map((receipts) => {
				return { ...receipts.find((r) => r.id === receiptId) };
			})
		);
	}

	public async addNewReceipt(newReceipt: Receipt) {
		this.receipts.pipe(take(1)).subscribe((receipts) => {
			this._receipts.next(receipts.concat(newReceipt));
		});
		await this.saveReceipts();
	}

	private async saveReceipts() {
		await this.receipts.pipe(take(1)).subscribe((receipts) => {
			Storage.set({
				key: this.STORAGE_KEY,
				value: JSON.stringify(receipts)
			});
			console.log('receipt saved!');
		});
	}

	private async getSavedReceipts() {
		const retreivedReceipts = await Storage.get({ key: this.STORAGE_KEY });
		return JSON.parse(retreivedReceipts.value) as Receipt[];
	}

	public deleteSavedReceipt(receiptId: string) {
		this.receipts.pipe(take(1)).subscribe((receipts) => {
			this._receipts.next(receipts.filter((r) => r.id !== receiptId));
			this.saveReceipts();
		});
	}
}

import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt-model';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
	providedIn: 'root'
})
export class ReceiptService {
	private STORAGE_KEY: string = 'receipts-string';
	private _receipts: Receipt[];

	constructor() {}

	public async getReceipts() {
		if (this._receipts === undefined) {
			this._receipts = await this.getSavedReceipts();
		}
		return [ ...this._receipts ];
	}

	public getCurrentReceipt(receiptId: string) {
		return { ...this._receipts.find((r) => r.id === receiptId) };
	}

	public async addNewReceipt(receipt: Receipt) {
		this._receipts.unshift(receipt);
		await this.saveReceipts();
	}

	private async saveReceipts() {
		await Storage.set({
			key: this.STORAGE_KEY,
			value: JSON.stringify(this._receipts)
		});
		console.log('receipt saved!');
	}

	private async getSavedReceipts() {
		const retreivedReceipts = await Storage.get({ key: this.STORAGE_KEY });
		return JSON.parse(retreivedReceipts.value);
	}

	public deleteSavedReceipt(receiptId: string) {
		const newReceipts = this._receipts.filter((r) => r.id !== receiptId);
		this._receipts = newReceipts;
		this.saveReceipts();
	}
}

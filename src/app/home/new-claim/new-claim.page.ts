import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Receipt } from '../../models/receipt-model';
import { ReceiptService } from '../../services/receipt-service.service';
import { Image } from '../../services/image-service.service';

@Component({
	selector: 'app-new-claim',
	templateUrl: './new-claim.page.html',
	styleUrls: [ './new-claim.page.scss' ]
})
export class NewClaimPage implements OnInit {
	newReceiptForm: FormGroup;
	defaultDate: string;
	public maxDate: string;
	imageType: string;

	constructor(private navCtrl: NavController, private receiptService: ReceiptService) {
		this.defaultDate = new Date().toISOString();
		this.maxDate = this.getToday();
	}

	ngOnInit() {
		this.newReceiptForm = new FormGroup({
			amount: new FormControl(null, {
				updateOn: 'blur',
				validators: [ Validators.required, Validators.min(0.01) ]
			}),
			date: new FormControl(this.getToday(), {
				updateOn: 'blur',
				validators: [ Validators.required ]
			}),
			image: new FormControl(null)
		});
	}

	async onCreateReceipt() {
		if (!this.newReceiptForm.valid || !this.newReceiptForm.get('image').value) {
			return;
		}

		const newReceipt = new Receipt(
			'r' + Math.random().toString(),
			this.newReceiptForm.value.amount,
			new Date(this.newReceiptForm.value.date),
			this.newReceiptForm.value.image
		);
		this.receiptService.addNewReceipt(newReceipt);
		this.navCtrl.navigateBack('/home');
	}

	getToday() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1; //January is 0!
		let yyyy = today.getFullYear();
		if (dd < 10) {
			dd = 0 + dd;
		}
		if (mm < 10) {
			mm = 0 + mm;
		}

		return yyyy + '-' + mm + '-' + dd;
	}

	onImagePicked(imageData: Image) {
		this.newReceiptForm.patchValue({ image: imageData });
	}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Receipt } from '../../models/receipt-model';
import { ImageService } from '../../services/image-service.service';
import { ReceiptService } from '../../services/receipt-service.service';

function base64toBlob(base64Data, contentType) {
	contentType = contentType || '';
	const sliceSize = 1024;
	const byteCharacters = atob(base64Data);
	const bytesLength = byteCharacters.length;
	const slicesCount = Math.ceil(bytesLength / sliceSize);
	const byteArrays = new Array(slicesCount);

	for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		const begin = sliceIndex * sliceSize;
		const end = Math.min(begin + sliceSize, bytesLength);

		const bytes = new Array(end - begin);
		for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
			bytes[i] = byteCharacters[offset].charCodeAt(0);
		}
		byteArrays[sliceIndex] = new Uint8Array(bytes);
	}
	return new Blob(byteArrays, { type: contentType });
}

@Component({
	selector: 'app-new-claim',
	templateUrl: './new-claim.page.html',
	styleUrls: [ './new-claim.page.scss' ]
})
export class NewClaimPage implements OnInit {
	newReceiptForm: FormGroup;
	defaultDate: Date = new Date();

	constructor(
		private imageService: ImageService,
		private navCtrl: NavController,
		private receiptService: ReceiptService
	) {}

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

	onCreateReceipt() {
		if (!this.newReceiptForm.valid || !this.newReceiptForm.get('image').value) {
			return;
		}
		const newReceipt = new Receipt(
			'r' + Math.random().toString(),
			this.newReceiptForm.value.amount,
			new Date(this.newReceiptForm.value.date),
			'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/200px-ReceiptSwiss.jpg'
		);
		console.log(newReceipt);
		this.receiptService.addNewReceipt(newReceipt);
		this.navCtrl.navigateBack('/home');
		console.log(this.newReceiptForm.value);
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

	onImagePicked(imageData: string | File, imageType: string) {
		let imageFile;
		let imageStore;
		if (typeof imageData === 'string') {
			try {
				imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
				imageStore = this.imageService.saveImage('.jpeg', imageFile);
			} catch (error) {
				try {
					imageFile = base64toBlob(imageData.replace('data:image/png;base64,', ''), 'image/png');
					imageStore = this.imageService.saveImage('.png', imageFile);
				} catch (error) {
					console.log(error);
				}
			}
		} else {
			imageFile = imageData;
			imageStore = this.imageService.saveImage('.jpeg', imageFile);
		}
		console.log(imageStore);
		this.newReceiptForm.patchValue({ image: imageFile });
	}
}

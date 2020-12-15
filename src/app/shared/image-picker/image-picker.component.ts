import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { ImageService, Image } from '../../services/image-service.service';

@Component({
	selector: 'app-image-picker',
	templateUrl: './image-picker.component.html',
	styleUrls: [ './image-picker.component.scss' ]
})
export class ImagePickerComponent implements OnInit {
	@ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
	@Output() imagePick = new EventEmitter<Image>();
	@Output() imageFormat = new EventEmitter<string>();
	selectedImage: string;
	usePicker = false;

	constructor(private platform: Platform, private imageService: ImageService) {}

	ngOnInit() {}

	async onImagePicked() {
		if (!Capacitor.isPluginAvailable('Camera')) {
			return;
		}

		let image = await this.imageService.addNewToGallery();
		this.selectedImage = image.webviewPath;
		this.imagePick.emit(image);
	}
}

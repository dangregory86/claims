import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';

@Component({
	selector: 'app-image-picker',
	templateUrl: './image-picker.component.html',
	styleUrls: [ './image-picker.component.scss' ]
})
export class ImagePickerComponent implements OnInit {
	@Output() imagePick = new EventEmitter<string>();
	selectedImage: string;

	constructor() {}

	ngOnInit() {}

	onImagePicked() {
		if (!Capacitor.isPluginAvailable('Camera')) {
			return;
		}
		Plugins.Camera
			.getPhoto({
				quality: 70,
				source: CameraSource.Prompt,
				correctOrientation: true,
				width: 400,
				resultType: CameraResultType.Base64
			})
			.then((image) => {
				this.selectedImage = image.base64String;
				this.imagePick.emit(image.base64String);
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

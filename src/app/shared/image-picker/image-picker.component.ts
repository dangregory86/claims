import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
	selector: 'app-image-picker',
	templateUrl: './image-picker.component.html',
	styleUrls: [ './image-picker.component.scss' ]
})
export class ImagePickerComponent implements OnInit {
	@ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
	@Output() imagePick = new EventEmitter<string | File>();
	@Output() imageFormat = new EventEmitter<string>();
	selectedImage: string;
	usePicker = false;

	constructor(private platform: Platform) {}

	ngOnInit() {
		if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
			this.usePicker = true;
		}
	}

	onImagePicked() {
		if (!Capacitor.isPluginAvailable('Camera')) {
			this.filePickerRef.nativeElement.click();
			return;
		}
		Plugins.Camera
			.getPhoto({
				quality: 70,
				source: CameraSource.Prompt,
				correctOrientation: true,
				width: 400,
				resultType: CameraResultType.DataUrl
			})
			.then((image) => {
				this.selectedImage = image.dataUrl;
				this.imagePick.emit(image.dataUrl);
			})
			.catch((error) => {
				console.log(error);
				if (this.usePicker) {
					this.filePickerRef.nativeElement.click();
				}
				return false;
			});
	}

	onFileChosen(event: Event) {
		const pickedFile = (event.target as HTMLInputElement).files[0];
		if (!pickedFile) {
			return;
		}
		const fr = new FileReader();
		fr.onload = () => {
			const dataUrl = fr.result.toString();
			this.selectedImage = dataUrl;
			this.imagePick.emit(pickedFile);
		};
		fr.readAsDataURL(pickedFile);
	}
}

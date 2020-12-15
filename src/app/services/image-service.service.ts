import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Camera, Filesystem } = Plugins;

@Injectable({
	providedIn: 'root'
})
export class ImageService {
	public photos: Image[] = [];
	private platform: Platform;

	constructor(platform: Platform) {
		this.platform = platform;
	}

	public async addNewToGallery() {
		// Take a photo
		const capturedPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Uri,
			source: CameraSource.Camera,
			quality: 75
		});

		const savedImageFile = await this.savePicture(capturedPhoto);
		return savedImageFile;
	}

	public async loadSaved(image: Image) {
		if (!this.platform.is('hybrid')) {
			// Read each saved photo's data from the Filesystem
			const readFile = await Filesystem.readFile({
				path: image.filepath,
				directory: FilesystemDirectory.Data
			});

			// Web platform only: Load the photo as base64 data
			image.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
			return image;
		} else {
			return image;
		}
	}

	// Save picture to file on device
	private async savePicture(cameraPhoto: CameraPhoto) {
		// Convert photo to base64 format, required by Filesystem API to save
		const base64Data = await this.readAsBase64(cameraPhoto);

		// Write the file to the data directory
		const fileName = new Date().getTime() + '.jpeg';
		const savedFile = await Filesystem.writeFile({
			path: fileName,
			data: base64Data,
			directory: FilesystemDirectory.Data
		});

		if (this.platform.is('hybrid')) {
			// Display the new image by rewriting the 'file://' path to HTTP
			// Details: https://ionicframework.com/docs/building/webview#file-protocol
			return {
				filepath: savedFile.uri,
				webviewPath: Capacitor.convertFileSrc(savedFile.uri)
			};
		} else {
			// Use webPath to display the new image instead of base64 since it's
			// already loaded into memory
			return {
				filepath: fileName,
				webviewPath: cameraPhoto.webPath
			};
		}
	}

	private async readAsBase64(cameraPhoto: CameraPhoto) {
		if (this.platform.is('hybrid')) {
			// Read the file into base64 format
			const file = await Filesystem.readFile({
				path: cameraPhoto.path
			});

			return file.data;
		} else {
			const response = await fetch(cameraPhoto.webPath);
			const blob = await response.blob();

			return (await this.convertBlobToBase64(blob)) as string;
		}
	}

	convertBlobToBase64 = (blob: Blob) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = reject;
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.readAsDataURL(blob);
		});
}

export interface Image {
	filepath: string;
	webviewPath: string;
}

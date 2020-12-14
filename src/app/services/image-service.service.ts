import { Injectable } from '@angular/core';
import { Filesystem, FilesystemDirectory } from '@capacitor/core';

@Injectable({
	providedIn: 'root'
})
export class ImageService {
	constructor() {}

	async saveImage(type: string, image: Blob) {
		console.log(image);
		const data = (await this.convertBlobToBase64(image)) as string;
		const fileName = new Date().getTime() + type;
		console.log(fileName);
		const savedFile = await Filesystem.writeFile({
			path: fileName,
			data: data,
			directory: FilesystemDirectory.Data
		});
		console.log(savedFile);
		return savedFile.uri;
	}

	private convertBlobToBase64 = (blob: Blob) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = reject;
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.readAsDataURL(blob);
		});

	async getImageUrl(fullPath: string) {
		const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
		const file = await Filesystem.readFile({
			path: path,
			directory: FilesystemDirectory.Data
		});
		console.log(file, `data:image/jpeg;base64,${file.data}`);
		return `data:image/jpeg;base64,${file.data}`;
	}
}

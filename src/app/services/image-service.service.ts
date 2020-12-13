import { Injectable } from '@angular/core';
import { Filesystem, FilesystemDirectory } from '@capacitor/core';

@Injectable({
	providedIn: 'root'
})
export class ImageService {
	constructor() {}

	async saveImage(type: string, image: File) {
		let fr = new FileReader();
		let dataUrl;
		fr.onload = () => {
			dataUrl = fr.result.toString();
		};
		fr.readAsDataURL(image);
		const fileName = new Date().getTime() + type;
		const savedFile = await Filesystem.writeFile({
			path: fileName,
			data: dataUrl,
			directory: FilesystemDirectory.Data
		});
		console.log(fileName);
		return {
			filepath: fileName
		};
	}
}

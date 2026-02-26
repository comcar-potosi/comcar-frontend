import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { MimeTypeEnum } from '@core/enums/mime-type';
import { environment } from '@core/environments/environment.development';
import { AttachmentResponse } from '@core/interfaces/Attachment.interface';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class FileService {

   @Output() eventClearFile: EventEmitter<void> = new EventEmitter()

   private http = inject(HttpClient);

   private serverUrlMedia: string = environment.server_url + "media";

   private upload(dataBody: FormData) {
      return this.http.post<AttachmentResponse>(`${this.serverUrlMedia}/upload`, dataBody)
   }

   public getFile(fileName: string): Observable<ArrayBuffer> {
      return this.http.get(`${this.serverUrlMedia}/${fileName}`, { responseType: 'arraybuffer'})
   }

   public uploadFile(archivoUploaded: File, description: string): Promise<AttachmentResponse> {
      return new Promise((resolve, reject) => {
         const formData = new FormData();
         formData.append('file', archivoUploaded);
         formData.append('detail', description);
         this.upload(formData).subscribe({
            next: (resp) => {
               resolve(resp);
            },
            error: (err) => {
               reject(err)
            }
         });
      })
   }

   public convertArraybufferToFile(arraybuffer: ArrayBuffer, fileName: string, mimeType: MimeTypeEnum): File {
      return new File([arraybuffer], fileName, { type: mimeType })
   }
   
   public convertBase64ToFile(base64String: string, fileName: string, mimeType: MimeTypeEnum): File {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      return new File([blob], fileName, { type: mimeType });
   }

   public convertFileToBase64(file: File, cleanBase64: boolean): Promise<string> {
      return new Promise( (resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => {
            const base64Image = reader.result as string;
            cleanBase64?
               resolve(base64Image.split(',')[1]):
               resolve(base64Image);
         };
         reader.onerror = error => reject(error);
      })
   }

   public downloadFile(file: File, fileName: string): void {
      const url = window.URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
   }

   public openPdfInNewTab(file: File) {
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
   }
}

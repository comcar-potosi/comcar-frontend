import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { FileService } from '@core/services/file-service.service';
import { LABELS, TOOLTIPS } from '@core/constants/labels';
import { ModeInputFile } from '@core/enums/file.enum';
import { MESSAGES } from '@core/constants/messages';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-input-file',
    imports: [CommonModule, FileUploadModule, TooltipModule, ButtonModule],
    templateUrl: './input-file.component.html'
})
export class InputFileComponent implements OnInit, AfterViewInit {
  
  @ViewChild('fileUpload') fileUpload: FileUpload;

  @Input() labelButton: string = LABELS.uploadFile;
  @Input() typeFileAccept: string = '';
  @Input() maxSizeAllowed: number = 25000000;
  @Input() mode: ModeInputFile = ModeInputFile.ADVANCED;
  @Input() file: File;
  @Output() archivoUploaded = new EventEmitter<File>();

  public readonly tooltips = TOOLTIPS;
  public readonly messages = MESSAGES;
  public readonly modeInputFile = ModeInputFile;
  private fileService = inject(FileService);

  ngOnInit(): void {
    this.fileService.eventClearFile.subscribe(() => {
      this.clearFile();
    })
  }
  
  ngAfterViewInit(): void {
    if (this.file) {
      setTimeout(() => {
        this.fileUpload.files = [this.file]; 
        const fileSelectEvent: FileSelectEvent = {
          currentFiles: [this.file],
          files: [],
          originalEvent: null
        }
        this.fileUpload.onSelect.emit(fileSelectEvent)
      }, 150);
    }
  }



  public loadFile(event?: FileSelectEvent) {
    this.file = event? event.currentFiles[0]: null;
    this.archivoUploaded.emit(this.file);
    this.labelButton = this.file? this.file.name: LABELS.uploadFile;
  }
  
  public clearFile() {
    this.fileUpload.clear();
    this.loadFile();
  }
}

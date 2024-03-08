import { Directive, ElementRef, EventEmitter, HostListener, NgModule, Output } from "@angular/core";

@Directive({
    selector: '[PjDragDropUpload]',
})
export class PjFileDragDropUploadDirective {
    @Output()
    dropedFiles = new EventEmitter<Array<File>>();

    @HostListener('dragover', ['$event'])
    onDragover($event: any): void {
        $event.preventDefault();
        $event.stopPropagation();
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave($event: any): void {
        $event.preventDefault();
        $event.stopPropagation();
    }

    @HostListener('drop', ['$event'])
    onDrop($event:any): void {
        $event.preventDefault();
        $event.stopPropagation();
        const files=$event.dataTransfer.files;
        if (files.length>0) {;
            this.dropedFiles.emit(files);   
        }
    }
}
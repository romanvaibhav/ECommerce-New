import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private messageService: MessageService) { }

showSuccess(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail});
}

showInfo(summary:string,detail: string) {
    this.messageService.add({ severity: 'info', summary, detail });
}

showWarn(summary:string,detail: string) {
    this.messageService.add({ severity: 'warn', summary,detail });
}

showError(summary:string,detail: string) {
    this.messageService.add({ severity: 'error', summary, detail });
}

showContrast() {
    this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Message Content' });
}

showSecondary(summary:string,detail: string) {
    this.messageService.add({ severity: 'secondary', summary, detail });
}

}

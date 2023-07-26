import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { AppService } from './shared/app.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private appService: AppService) { }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.error('Error:: ', error);
      this.zone.run(() => this.appService.logout());
    }
  }
}

import {ToastOptions} from 'ng2-toastr';
import { Injectable } from '@angular/core';

//Toastr global configuration option
@Injectable()
export class CustomOption extends ToastOptions {
  positionClass = 'toast-bottom-right';
  dismiss = 'auto';
  toastLife = 3000;
}


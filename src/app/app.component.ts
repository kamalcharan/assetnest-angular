import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CommonserviceService } from "./shared/commonservice.service";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    status: Boolean = false;
    //Set toastr container ref configuration for toastr positioning on screen
    constructor(public toastr: ToastsManager,  private cms: CommonserviceService, vRef: ViewContainerRef) {

        this.toastr.setRootViewContainerRef(vRef);
        this.cms.SendMessages$.subscribe((x) => {
            if (x) {
              this.status = true;
            } else {
              this.status = false;
            }
          });
    }


}
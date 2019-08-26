
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { CustomOption } from "./shared/toastr/custom-option";
import {CommonserviceService} from "./shared/commonservice.service"
import {UserDataServiceService} from "./shared/user-data-service.service"
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';
import { CKEditorModule } from 'ngx-ckeditor';






@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent        
      ],
    imports: [
        HttpClientModule,
        HttpModule,
        CKEditorModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        ToastModule.forRoot(),
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
        })
    ],
    providers: [
        //Toastr providers
        UserDataServiceService,
        CommonserviceService,
        UserDataServiceService,
        { provide: ToastOptions, useClass: CustomOption }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
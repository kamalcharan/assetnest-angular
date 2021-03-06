import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import {HomeComponent} from "../../home/home/home.component";
import { ConfigurationComponent } from '../../configuration/configuration.component';
import { OminichaneelsComponent } from '../../ominichaneels/ominichaneels.component';
import { CreateBrandsComponent } from '../../create-brands/create-brands.component';

import { ConfigureUsersComponent } from '../../configure-users/configure-users.component';
import { CategorieslistComponent } from '../../categorieslist/categorieslist.component';
import { SingleIntegrationsComponent } from '../../single-integrations/single-integrations.component';
import { ManageIntegrationsComponent } from '../../manage-integrations/manage-integrations.component';
import { ManageTextEditorComponent } from '../../manage-text-editor/manage-text-editor.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { CatlogCatagoriesComponent } from '../../catlog-catagories/catlog-catagories.component';
import { RegionCreationComponent } from '../../region-creation/region-creation.component';
import { SingleOminiChannalsComponent } from '../../single-omini-channals/single-omini-channals.component';
import { MobilepanelageComponent } from '../../mobilepanelage/mobilepanelage.component';



import { ViewApikeysComponent } from '../../view-apikeys/view-apikeys.component';
import { CreateApikeyComponent } from '../../create-apikey/create-apikey.component';
import { ArchwizardModule } from 'ng2-archwizard';

import { CompanySetupComponent } from '../../company-setup/company-setup.component';
import { CustomersComponent } from '../../customers/customers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        CKEditorModule,
        ArchwizardModule,
        NgxDatatableModule
    ],
    declarations: [       
        GalleryPageComponent,
        InvoicePageComponent,       
        HorizontalTimelinePageComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        HomeComponent,
        ConfigurationComponent,
        OminichaneelsComponent,
        CreateBrandsComponent,
        ConfigureUsersComponent,
        ViewApikeysComponent,
        CreateApikeyComponent,
        CategorieslistComponent,
        SingleIntegrationsComponent,
        ManageIntegrationsComponent,
        ManageTextEditorComponent,
        CatlogCatagoriesComponent,
        RegionCreationComponent,
        SingleOminiChannalsComponent,
        MobilepanelageComponent,
        CompanySetupComponent,
        CustomersComponent
    ]
})
export class FullPagesModule { }

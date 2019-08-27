import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import {HomeComponent} from "../../home/home/home.component";
  import { from } from 'rxjs/observable/from';
  import { ConfigurationComponent } from '../../configuration/configuration.component';
  import { OminichaneelsComponent } from '../../ominichaneels/ominichaneels.component';
  import { CreateBrandsComponent } from '../../create-brands/create-brands.component';
  import { ConfigureUsersComponent } from '../../configure-users/configure-users.component';

  import { ViewApikeysComponent } from '../../view-apikeys/view-apikeys.component';
  import { CreateApikeyComponent } from '../../create-apikey/create-apikey.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Home',
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'Settings',
        component: ConfigurationComponent,
        data: {
          title: 'Settings'
        }
      },
      {
        path: 'OmniChanal',
        component: OminichaneelsComponent,
        data: {
          title: 'OmniChanal'
        }
      },
      {
        path: 'Brands',
        component: CreateBrandsComponent,
        data: {
          title: 'Brands'
        }
      },
      {
        path: 'Users',
        component: ConfigureUsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'gallery',
        component: GalleryPageComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },      
      {
        path: 'horizontaltimeline',
        component: HorizontalTimelinePageComponent,
        data: {
          title: 'Horizontal Timeline Page'
        }
      },
      {
        path: 'verticaltimeline',
        component: VerticalTimelinePageComponent,
        data: {
          title: 'Vertical Timeline Page'
        }
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      }  ,
      {
        path: 'ViewAPIKeys',
        component: ViewApikeysComponent,
        data: {
          title: 'View API Keys'
        }
      } ,
      {
        path: 'CreateAPIKey',
        component:CreateApikeyComponent ,
        data: {
          title: 'Create API Key'
        }
      }  
     
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }

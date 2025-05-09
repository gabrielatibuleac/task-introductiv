import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MembersDetailsComponent } from './pages/members-details/members-details.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    { path:'member/:id', 
        component: MembersDetailsComponent
    },


];

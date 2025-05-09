import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MembersDetailsComponent } from './pages/members-details/members-details.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  { 
    path: 'gallery', 
    loadComponent: () => import('./components/image-gallery/image-gallery.component')
      .then(m => m.ImageGalleryComponent) 
  },
  { 
    path: 'image/:id', 
    loadComponent: () => import('./components/image-detail/image-detail.component')
      .then(m => m.ImageDetailComponent) 
  },
  {
    path: 'member/:id', 
    component: MembersDetailsComponent
  },
  { path: '**', redirectTo: '' }
];
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MembersDetailsComponent } from './pages/members-details/members-details.component';

export const routes: Routes = [
<<<<<<< HEAD
    {
        path: '',
        component: LandingPageComponent
    },
    { path:'member/:id', 
        component: MembersDetailsComponent
    },


];
=======
  { 
    path: '', 
    loadComponent: () => import('./components/splash-screen/splash-screen.component')
      .then(m => m.SplashScreenComponent) 
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
  { path: '**', redirectTo: '' }
];
>>>>>>> 2b50d76dc345ce632307a066a120b60baa3e1c9b

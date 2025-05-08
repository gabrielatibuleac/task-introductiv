import { Routes } from '@angular/router';

export const routes: Routes = [
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
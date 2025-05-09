import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MentorDetailComponent } from './pages/mentor-detail/mentor-detail.component';

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
  { path: 'mentori/:id', component: MentorDetailComponent },
  { path: 'boboci/:id', component: MentorDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
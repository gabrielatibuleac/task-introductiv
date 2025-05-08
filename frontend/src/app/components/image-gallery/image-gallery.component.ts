import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Image } from '../../shared/models/image.model';
import { interval, Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ])
    ])
  ]
})
export class ImageGalleryComponent implements OnInit {
  natureImages: Image[] = [];
  urbanImages: Image[] = [];
  isLoading = false; 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.natureImages = this.mentorImages();
    this.urbanImages = this.bobocImages();
  }

  navigateToImageDetail(image: Image): void {
    this.router.navigate(['/image', image._id]);
  }

  scrollRight(collectionElement: HTMLElement): void {
    collectionElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  scrollLeft(collectionElement: HTMLElement): void {
    collectionElement.scrollBy({ left: -300, behavior: 'smooth' });
  }
  
  // Simplified mock data
  private mentorImages(): Image[] {
    return [
      {
        _id: 'n1',
        title: 'Mentor 1',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'nature',
        description: 'descriere 1',
        order: 1
      },
      {
        _id: 'n2',
        title: 'Mentor 2',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'nature',
        description: 'descriere 2',
        order: 2
      },
      {
        _id: 'n3',
        title: 'Mentor 3',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'nature',
        description: 'descriere 3',
        order: 3
      }
    ];
  }
  
  private bobocImages(): Image[] {
    return [
      {
        _id: 'u1',
        title: 'Boboc 1',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'urban',
        description: 'descriere 1',
        order: 1
      },
      {
        _id: 'u2',
        title: 'Boboc 2',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'nature',
        description: 'descriere 2',
        order: 2
      },
      {
        _id: 'u3',
        title: 'Boboc 3',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'nature',
        description: 'descriere 3',
        order: 3
      }
    ];
  }
}
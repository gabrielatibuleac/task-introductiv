import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Image } from '../../shared/models/image.model';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { GalleryCommentsComponent } from '../gallery-comments/gallery-comments.component';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, GalleryCommentsComponent],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  animations: [
    trigger('cardAnimation', [
      state('active', style({
        transform: 'scale(1) translateX(0)',
        opacity: 1,
        zIndex: 10
      })),
      state('inactive', style({
        transform: 'scale(0.8) translateX(0)',
        opacity: 0.6
      })),
      transition('inactive => active', [
        animate('0.4s ease-in-out')
      ]),
      transition('active => inactive', [
        animate('0.4s ease-in-out')
      ])
    ])
  ]
})
export class ImageGalleryComponent implements OnInit {
  mentorImages: Image[] = [];
  bobocImages: Image[] = [];
  isLoading = false;
  activeMentorIndex = 1; 
  activeBobocIndex = 1; 

  @ViewChild('mentorCarousel') mentorCarousel!: ElementRef;
  @ViewChild('bobocCarousel') bobocCarousel!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.mentorImages = this.getMentorImages();
    this.bobocImages = this.getBobocImages();
  }

  navigateToImageDetail(image: Image, event: Event): void {
    event.stopPropagation();
    
    // Determină ruta în funcție de colecție
    const route = image.collection === 'mentori' 
      ? `/mentori/${image._id}` 
      : `/boboci/${image._id}`;
    
    this.router.navigate([route]);
  }
  
  setActiveMentorIndex(index: number): void {
    this.activeMentorIndex = index;
  }

  setActiveBobocIndex(index: number): void {
    this.activeBobocIndex = index;
  }
  
  getCardState(index: number, activeIndex: number): string {
    return index === activeIndex ? 'active' : 'inactive';
  }
  
  // Simplified mock data with 4 images each
  public getMentorImages(): Image[] {
    return [
      {
        _id: 'n1',
        title: 'Alexandru Ioan',
        imageUrl: 'assets/images/alexandru-ioan.jpg',
        collection: 'mentori',
        description: 'Un pasionat al stilului de viață sănătos...',
        order: 1
      },
      {
        _id: 'n2',
        title: 'Alexandru Nechifor',
        imageUrl: 'assets/images/alexandru-nechifor.jpg',
        collection: 'mentori',
        description: 'Un bun lider...',
        order: 2
      },
      {
        _id: 'n3',
        title: 'Alin Motricala',
        imageUrl: 'assets/images/alin-motricala.jpg',
        collection: 'mentori',
        description: ' Maestru Strop al Angular-ului...',
        order: 3
      },
      {
        _id: 'n4',
        title: 'Mihnea Pavel',
        imageUrl: 'assets/images/mihnea-pavel.jpg',
        collection: 'mentori',
        description: 'Un PREMIAT...  ',
        order: 4
      },
      {
        _id: 'n5',
        title: 'Casandra Irimia',
        imageUrl: 'assets/images/casandra-irimia.jpg',
        collection: 'mentori',
        description: 'O fire deschisă..  ',
        order: 5
      }
    ];
  }
  
  public getBobocImages(): Image[] {
    return [
      {
        _id: 'u1',
        title: 'Andrei Moisa',
        imageUrl: 'assets/images/andrei-moisa.jpg',
        collection: 'boboci',
        description: 'Elegant din cap până-n picioare...',
        order: 1
      },
      {
        _id: 'u2',
        title: 'Diana Rosu',
        imageUrl: 'assets/images/diana-rosu.jpg',
        collection: 'boboci',
        description: 'Adoră să...',
        order: 2
      },
      {
        _id: 'u3',
        title: 'Cătălin Rusu',
        imageUrl: 'assets/images/catalin-rusu.jpg',
        collection: 'boboci',
        description: 'Caracterizat prin perspicacitate...',
        order: 3
      },
      {
        _id: 'u4',
        title: 'Gabriela Țibuleac',
        imageUrl: 'assets/images/gabriela-tibuleac.jpg',
        collection: 'boboci',
        description: 'O persoană deschisă....',
        order: 4
      }
    ];
  }
}
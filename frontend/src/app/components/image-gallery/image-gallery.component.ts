import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Image } from '../../shared/models/image.model';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
        title: 'Mentor 1',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'mentori',
        description: 'descriere mentor 1',
        order: 1
      },
      {
        _id: 'n2',
        title: 'Mentor 2',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'mentori',
        description: 'descriere mentor 2',
        order: 2
      },
      {
        _id: 'n3',
        title: 'Mentor 3',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'mentori',
        description: 'descriere mentor 3',
        order: 3
      },
      {
        _id: 'n4',
        title: 'Mentor 4',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'mentori',
        description: 'descriere mentor 4',
        order: 4
      }
    ];
  }
  
  public getBobocImages(): Image[] {
    return [
      {
        _id: 'u1',
        title: 'Boboc 1',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'boboci',
        description: 'descriere boboc 1',
        order: 1
      },
      {
        _id: 'u2',
        title: 'Boboc 2',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'boboci',
        description: 'descriere boboc 2',
        order: 2
      },
      {
        _id: 'u3',
        title: 'Boboc 3',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'boboci',
        description: 'descriere boboc 3',
        order: 3
      },
      {
        _id: 'u4',
        title: 'Boboc 4',
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'boboci',
        description: 'descriere boboc 4',
        order: 4
      }
    ];
  }
  
}
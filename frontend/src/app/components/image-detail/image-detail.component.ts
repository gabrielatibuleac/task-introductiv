import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Image } from '../../shared/models/image.model';
import { GalleryCommentsComponent } from '../gallery-comments/gallery-comments.component';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, GalleryCommentsComponent],
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  image: Image | null = null;
  imageId: string | null = null;
  
  // Properties needed for the template
  mentorImages: Image[] = [];
  bobocImages: Image[] = [];
  activeMentorIndex = 1;
  activeBobocIndex = 1;
  
  @ViewChild('mentorCarousel') mentorCarousel!: ElementRef;
  @ViewChild('bobocCarousel') bobocCarousel!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.imageId = params.get('id');
      console.log('Image ID:', this.imageId);
      
      // Initialize the image collections
      this.mentorImages = this.getMentorImages();
      this.bobocImages = this.getBobocImages();
    });
  }

  navigateToImageDetail(image: Image, event: Event): void {
    event.stopPropagation();
    
    // Determine route based on collection
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
  
  // Mock data for mentors
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
  
  // Mock data for boboci
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
        imageUrl: 'assets/images/scoobert.jpeg',
        collection: 'boboci',
        description: 'descriere boboc 3',
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
  
  goBack(): void {
    this.router.navigate(['/gallery']);
  }
}
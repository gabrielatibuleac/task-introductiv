import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../shared/models/image.model';


interface MentorImage extends Image {
  surpriseImageUrl?: string; 
}

@Component({
  selector: 'app-mentor-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.scss']
})
export class MentorDetailComponent implements OnInit {
  mentor: MentorImage | null = null;
  mentorId: string | null = null;
  collectionType: 'mentori' | null = null;
  currentImageUrl: string = '';
  
  // Easter egg functionality variables
  private originalImageUrl: string = '';
  private alternateImageUrl: string = 'assets/images/surprise-image.jpg'; 
  private isAlternateImage: boolean = false;
  
  @ViewChild('profileImage') profileImage!: ElementRef<HTMLImageElement>;
  @ViewChild('confettiContainer') confettiContainer!: ElementRef<HTMLDivElement>;

  mentorImages: MentorImage[] = [
    {
      _id: 'n1',
      title: 'Alexandru Ioan',
      imageUrl: 'assets/images/alexandru-ioan.jpg',
      collection: 'mentori',
      description: '',
      order: 1,
      surpriseImageUrl: 'assets/images/surprise-image.jpg'
    },
    {
      _id: 'n2',
      title: 'Alexandru Nechifor',
      imageUrl: 'assets/images/alexandru-nechifor.jpg',
      collection: 'mentori',
      description: '',
      order: 1,
      surpriseImageUrl: 'assets/images/cat-glass.jpg'
    },
    {
      _id: 'n3',
      title: 'Alin Motricala',
      imageUrl: 'assets/images/alin-motricala.jpg',
      collection: 'mentori',
      description: '',
      order: 1,
      surpriseImageUrl: 'assets/images/cata.jpg'
    },
    {
      _id: 'n4',
      title: 'Mihnea Pavel',
      imageUrl: 'assets/images/mihnea-pavel.jpg',
      collection: 'mentori',
      description: '',
      order: 1,
      surpriseImageUrl: 'assets/images/cat-bottle.jpg'
    },
    {
      _id: 'n5',
      title: 'Casandra Irimia',
      imageUrl: 'assets/images/casandra-irimia.jpg',
      collection: 'mentori',
      description: '',
      order: 1,
      surpriseImageUrl: 'assets/images/catc.jpg'
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mentorId = params.get('id');
      
      if (this.mentorId) {
        this.collectionType = 'mentori';
        this.mentor = this.mentorImages.find(m => m._id === this.mentorId) || null;

        if (this.mentor) {
          this.originalImageUrl = this.mentor.imageUrl;
          this.currentImageUrl = this.originalImageUrl;
          if (this.mentor.surpriseImageUrl) {
            this.alternateImageUrl = this.mentor.surpriseImageUrl;
          }
        } else {
          console.error(`No mentor found with ID: ${this.mentorId}`);
        }
      }
    });
  }

  triggerEasterEgg(): void {
    this.isAlternateImage = !this.isAlternateImage;
    this.currentImageUrl = this.isAlternateImage ? this.alternateImageUrl : this.originalImageUrl;
    
    this.profileImage.nativeElement.classList.add('animate-switch');
    this.createConfetti();
    
    setTimeout(() => {
      this.profileImage.nativeElement.classList.remove('animate-switch');
    }, 500);
  }
  
  private createConfetti(): void {
    const container = this.confettiContainer.nativeElement;
    container.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = this.getRandomColor();
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '0';
      confetti.style.borderRadius = '50%';
      
      const animation = confetti.animate([
        { top: '0', opacity: 1, transform: 'rotate(0deg)' },
        { top: '100%', opacity: 0, transform: 'rotate(360deg)' }
      ], {
        duration: 1000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
      });
      
      container.appendChild(confetti);
      animation.onfinish = () => confetti.remove();
    }
  }

  private getRandomColor(): string {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
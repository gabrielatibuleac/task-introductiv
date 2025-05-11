import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../shared/models/image.model';
interface BobocImage extends Image {
  surpriseImageUrl?: string; 
}
@Component({
  selector: 'app-boboc-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './boboc-detail.component.html',
  styleUrls: ['./boboc-detail.component.scss']
})
export class BobocDetailComponent implements OnInit {
  boboc: Image | null = null;
  bobocId: string | null = null;
  collectionType: 'boboci' | null = null;
  currentImageUrl: string = '';

  private originalImageUrl: string = '';
  private alternateImageUrl: string = 'assets/images/surprise-image.jpg';
  private isAlternateImage: boolean = false;
  
  @ViewChild('profileImage') profileImage!: ElementRef<HTMLImageElement>;
  @ViewChild('confettiContainer') confettiContainer!: ElementRef<HTMLDivElement>;
  
  bobocImages: Image[] = [
    {
      _id: 'u1',
      title: 'Andrei Moisa',
      imageUrl: 'assets/images/andrei-moisa.jpg',
      collection: 'boboci',
      description: '🏅 🏅 🏅 \nElegant din cap până-n picioare, își poartă umorul cu o notă ușor „stricată” care cucerește. Are o prezență aparte, mereu atent la detalii. Glumele sale sunt ca vinul vechi: nu pentru toată lumea, dar bune pentru cunoscători.',
      order: 1,
       surpriseImageUrl: 'assets/images/andrei.jpg'
    },
      {
      _id: 'u2',
      title: 'Diana Roșu',
      imageUrl: 'assets/images/diana-rosu.jpg',
      collection: 'boboci',
      description: '🌼 💐 🏵️\nAdoră să descopere locuri noi și să se lase purtată de drum. Este liberă, curioasă și spontană. Unde e o plimbare, e și ea.',
      order: 2,
         surpriseImageUrl: 'assets/images/diana.jpg'
    },
      {
      _id: 'u3',
      title: 'Cătălin Rusu',
      imageUrl: 'assets/images/catalin-rusu.jpg',
      collection: 'boboci',
      description: '',
      order: 3,
   surpriseImageUrl: 'assets/images/catalin.jpg'
    },
      {
      _id: 'u4',
      title: 'Gabriela Țibuleac',
      imageUrl: 'assets/images/gabriela-tibuleac.jpg',
      collection: 'boboci',
      description: 'O persoană deschisă la oportunități noi, cu o timiditate destul de mare care se topește în timp. Iubitoare de pisici puțin spus.\n „I’m just a girl”',
      order: 4,
         surpriseImageUrl: 'assets/images/gabi.jpg'
    },
    
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.bobocId = params.get('id');
    
    if (this.bobocId) {
      this.collectionType = 'boboci';
      this.boboc = this.bobocImages.find(b => b._id === this.bobocId) || null;

      if (this.boboc) {
        this.originalImageUrl = this.boboc.imageUrl;
        this.currentImageUrl = this.originalImageUrl;
        // Adaugă această verificare
        if (this.boboc.surpriseImageUrl) {
          this.alternateImageUrl = this.boboc.surpriseImageUrl;
        }
      } else {
        console.error(`No boboc found with ID: ${this.bobocId}`);
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
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';
import { ThemeImageDirective } from './theme-image.directive';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeImageDirective],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  animatedText = '';
  welcomeMessage = 'Cunoaște echipa!';
  showTeam = false;
  logoPath = 'assets/images/asii.png'; 
  darkLogoPath = 'assets/images/asii-dark.png'; // Adaugă calea către logo-ul pentru dark mode
  confettiParticles: any[] = [];

  constructor(private router: Router,
      public darkModeService: DarkModeService){
    // Actualizează logo-ul când se schimbă modul
    this.updateLogo();
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
    this.updateLogo();
  }
  
  ngOnInit(): void {
    this.typeWriterEffect();
    this.updateLogo();
  }

  // Metodă pentru actualizarea logo-ului în funcție de modul întunecat/luminos
  updateLogo(): void {
    this.logoPath = this.darkModeService.isDarkMode ? 
      this.darkLogoPath : 'assets/images/asii.png';
  }

  typeWriterEffect(): void {
    this.generateConfetti(150);
    setTimeout(() => this.showTeam = true, 300);

    let i = 0;
    const typing = () => {
      if (i < this.welcomeMessage.length) {
        this.animatedText += this.welcomeMessage.charAt(i);
        i++;
        setTimeout(typing, 100);
      } else {
        setTimeout(() => this.showTeam = true, 500);
      }
    };
    typing();
  }

  navigateToGallery(): void {
    this.router.navigate(['/gallery']);
  }

  generateConfetti(count: number) {
    const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];
    this.confettiParticles = Array(count).fill(0).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      animationDuration: (Math.random() * 3 + 2) + 's',
      animationDelay: (Math.random() * 5) + 's',
      background: colors[Math.floor(Math.random() * colors.length)],
      size: (Math.random() * 10 + 5) + 'px',
      shape: Math.random() > 0.5 ? 'square' : 'circle'  
    }));
  }
}
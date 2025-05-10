import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private darkModeSubscription: Subscription | undefined;
  
  constructor(private darkModeService: DarkModeService) {}
  
  ngOnInit() {
    // Folosim BehaviorSubject pentru a primi starea modului întunecat 
    // în toate componentele aplicației
    this.darkModeSubscription = this.darkModeService.darkModeChange.subscribe(isDarkMode => {
      // Putem adăuga aici și alte modificări globale când se schimbă modul întunecat
      console.log('Dark mode global status changed:', isDarkMode);
    });
  }
  
  ngOnDestroy() {
    // Curățăm subscription-ul pentru a preveni memory leak
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }
}
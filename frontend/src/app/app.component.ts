import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './services/dark-mode.service';
import { Subscription } from 'rxjs';
import { DarkModeToggleComponent } from './components/dark-mode-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DarkModeToggleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private darkModeSubscription: Subscription | undefined;
  
  constructor(private darkModeService: DarkModeService) {}
  
  ngOnInit() {
    this.darkModeSubscription = this.darkModeService.darkModeChange.subscribe(isDarkMode => {
      console.log('Dark mode global status changed:', isDarkMode);
    });
  }
  
  ngOnDestroy() {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }
}
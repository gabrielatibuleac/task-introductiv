import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Disponibil în întreaga aplicație
})
export class DarkModeService {
  private readonly DARK_MODE_KEY = 'darkModeEnabled';
  isDarkMode = false;
  
  // Adăugăm un Subject pentru a emite schimbările modului
  darkModeChange = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadDarkModePreference();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.updateDarkModeState();
    this.saveDarkModePreference();
    
    // Emit noul status pentru toți abonații
    this.darkModeChange.next(this.isDarkMode);
  }

  private updateDarkModeState(): void {
    const html = document.documentElement;
    
    if (this.isDarkMode) {
      html.classList.add('dark-mode');
      html.style.setProperty('color-scheme', 'dark');
    } else {
      html.classList.remove('dark-mode');
      html.style.setProperty('color-scheme', 'light');
    }
  }

  private saveDarkModePreference(): void {
    localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(this.isDarkMode));
  }

  private loadDarkModePreference(): void {
    const savedPreference = localStorage.getItem(this.DARK_MODE_KEY);
    if (savedPreference !== null) {
      this.isDarkMode = JSON.parse(savedPreference);
      this.updateDarkModeState();
      // Actualizăm BehaviorSubject cu valoarea curentă
      this.darkModeChange.next(this.isDarkMode);
    }
  }
}
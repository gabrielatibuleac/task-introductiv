import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Disponibil în întreaga aplicație
})
export class DarkModeService {
  private readonly DARK_MODE_KEY = 'darkModeEnabled';
  isDarkMode = false;
  
  // BehaviorSubject pentru a emite schimbările modului
  darkModeChange = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadDarkModePreference();
    // Check for system preference if no saved preference
    this.checkSystemPreference();
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

  // Check system preference for dark mode
  private checkSystemPreference(): void {
    // Only check if no saved preference exists
    if (localStorage.getItem(this.DARK_MODE_KEY) === null) {
      // Check if user prefers dark mode at OS level
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (prefersDarkMode) {
        this.isDarkMode = true;
        this.updateDarkModeState();
        this.saveDarkModePreference();
        this.darkModeChange.next(this.isDarkMode);
      }
    }
  }

  // Public method to enable subscription to system preference changes
  enableSystemPreferenceDetection(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Modern approach using addEventListener
    mediaQuery.addEventListener('change', (e) => {
      this.isDarkMode = e.matches;
      this.updateDarkModeState();
      this.saveDarkModePreference();
      this.darkModeChange.next(this.isDarkMode);
    });
  }
}
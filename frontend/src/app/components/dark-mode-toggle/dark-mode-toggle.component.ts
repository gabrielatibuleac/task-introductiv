import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss']
})
export class DarkModeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    // Subscribe to dark mode changes
    this.darkModeService.darkModeChange.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appThemeImage]',
  standalone: true
})
export class ThemeImageDirective implements OnInit, OnDestroy {
  @Input() lightSrc!: string;
  @Input() darkSrc!: string;

  private darkModeSubscription: Subscription | undefined;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.updateImageSrc();
    
    this.darkModeSubscription = this.darkModeService.darkModeChange.subscribe(() => {
      this.updateImageSrc();
    });
  }

  ngOnDestroy(): void {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

  private updateImageSrc(): void {
    if (!this.lightSrc || !this.darkSrc) {
      console.warn('ThemeImageDirective: Both lightSrc and darkSrc must be provided');
      return;
    }
    
    this.el.nativeElement.src = this.darkModeService.isDarkMode ? 
      this.darkSrc : this.lightSrc;
  }
}
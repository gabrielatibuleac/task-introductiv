// app/components/splash-screen/splash-screen.component.ts - Optimized
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  template: `
    <div class="splash-screen">
      <div class="splash-content">
        <h1>Site realizat de Bobocii ASII</h1>
        <p>Se încarcă...</p>
      </div>
    </div>
  `
})
export class SplashScreenComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.router.navigate(['/gallery']), 2000); //2 sec
  }
}
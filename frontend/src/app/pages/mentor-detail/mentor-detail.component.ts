import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../shared/models/image.model';

@Component({
  selector: 'app-mentor-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.scss']
})
export class MentorDetailComponent implements OnInit {
  mentor: Image | null = null;
  mentorId: string | null = null;
  collectionType: 'mentori' | 'boboci' | null = null;
  
  // Mock data arrays for demonstration
  mentorImages: Image[] = [
    {
      _id: 'n1',
      title: 'Mentor 1',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'mentori',
      description: 'Mentor cu experiență în programare web și bazele Angular. Este dedicat în a ajuta bobocii să își dezvolte abilitățile tehnice și să se integreze în comunitatea ASII.',
      order: 1
    },
    {
      _id: 'n2',
      title: 'Mentor 2',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'mentori',
      description: 'Specialist în arhitecturi software și design patterns. Pasionat de Clean Code și metodologii agile de dezvoltare.',
      order: 2
    },
    {
      _id: 'n3',
      title: 'Mentor 3',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'mentori',
      description: 'Expert în baze de date și SQL. Oferă mentorat pentru proiecte de cercetare și dezvoltare în domeniul Big Data.',
      order: 3
    },
    {
      _id: 'n4',
      title: 'Mentor 4',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'mentori',
      description: 'Specializat în inteligență artificială și machine learning. Conduce sesiuni de mentorat pentru studenții interesați de AI.',
      order: 4
    }
  ];
  
  bobocImages: Image[] = [
    {
      _id: 'u1',
      title: 'Boboc 1',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'boboci',
      description: 'Student entuziast în primul an, pasionat de programare web și dezvoltare frontend. Învață Angular și participă activ la proiectele ASII.',
      order: 1
    },
    {
      _id: 'u2',
      title: 'Boboc 2',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'boboci',
      description: 'Interesat de securitate informatică și dezvoltare backend. Lucrează la primele sale proiecte în Node.js și Python.',
      order: 2
    },
    {
      _id: 'u3',
      title: 'Boboc 3',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'boboci',
      description: 'Pasionat de machine learning și analiză de date. Studiază algoritmi de ML și participă la competiții de data science.',
      order: 3
    },
    {
      _id: 'u4',
      title: 'Boboc 4',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'boboci',
      description: 'Focusat pe dezvoltare mobilă și UI/UX design. Explorează Flutter și React Native pentru aplicații cross-platform.',
      order: 4
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route params to get the mentor ID
    this.route.paramMap.subscribe(params => {
      this.mentorId = params.get('id');
      
      if (this.mentorId) {
        // Check if we're on a "mentori" route
        if (this.route.snapshot.url[0]?.path === 'mentori') {
          this.collectionType = 'mentori';
          this.mentor = this.mentorImages.find(m => m._id === this.mentorId) || null;
        } 
        // Check if we're on a "boboci" route
        else if (this.route.snapshot.url[0]?.path === 'boboci') {
          this.collectionType = 'boboci';
          this.mentor = this.bobocImages.find(b => b._id === this.mentorId) || null;
        }

        // If mentor not found, set mentor to null (will show "not found" template)
        if (!this.mentor) {
          console.error(`No person found with ID: ${this.mentorId} in collection: ${this.collectionType}`);
        }
      }
    });
  }

  // Helper method to generate a fake email for mentors
  getEmailForMentor(mentor: Image): string {
    // Generate a fake email based on mentor title
    const name = mentor.title.toLowerCase().replace(/\s+/g, '.');
    return `${name}@asii.ro`;
  }
}
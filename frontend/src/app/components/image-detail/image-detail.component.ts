import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Image } from '../../shared/models/image.model';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  image: Image | null = null;
  isLoading = true;
  errorMessage = '';
  
  private mockImages: Image[] = [
    // Mentors
    {
      _id: 'n1',
      title: 'Mentor 1',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'nature',
      description: 'mentor1',
      order: 1
    },
    {
      _id: 'n2',
      title: 'Mentor 2',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'nature',
      description: 'mentor2',
      order: 2
    },
    {
      _id: 'n3',
      title: 'Mentor 3',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'nature',
      description: 'mentor3',
      order: 3
    },
    // Boboci
    {
      _id: 'u1',
      title: 'Boboc 1',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'urban',
      description: 'boboc1',
      order: 1
    },
    {
      _id: 'u2',
      title: 'Boboc 2',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'urban',
      description: 'boboc2',
      order: 2
    },
    {
      _id: 'u3',
      title: 'Boboc 3',
      imageUrl: 'assets/images/scoobert.jpeg',
      collection: 'urban',
      description: 'boboc3.',
      order: 3
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.image = this.mockImages.find(img => img._id === id) || null;
        this.isLoading = false;
      } else {
        this.errorMessage = 'Image ID not provided';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/gallery']);
  }
}
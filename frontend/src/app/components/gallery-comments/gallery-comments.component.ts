import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-gallery-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-comments.component.html',
  styleUrls: ['./gallery-comments.component.scss']
})
export class GalleryCommentsComponent implements OnInit {
  comments: Comment[] = [];
  isLoading = true;
  
  private mentorNames: Record<string, string> = {};
  private bobocNames: Record<string, string> = {};

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.setupNameMappings();
    this.loadAllComments();
  }
  
  private setupNameMappings(): void {
    this.mentorNames['n1'] = 'Alexandru Ioan';
    this.mentorNames['n2'] = 'Alexandru Nechifor';
    this.mentorNames['n3'] = 'Alin Motricala';
    this.mentorNames['n4'] = 'Mihnea Pavel';
    this.mentorNames['n5'] = 'Casandra Irimia';
    
    this.bobocNames['u1'] = 'Andrei Moisa';
    this.bobocNames['u2'] = 'Diana Roșu';
    this.bobocNames['u3'] = 'Cătălin Rusu';
    this.bobocNames['u4'] = 'Gabriela Țibuleac';
  }
  
  private loadAllComments(): void {
    this.commentService.getAllComments()
      .subscribe({
        next: (comments) => {
          comments.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
          
          this.comments = comments.slice(0, 10);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading comments:', error);
          this.isLoading = false;
        }
      });
  }
  
  getTargetName(itemId: string): string {
    if (this.mentorNames[itemId]) {
      return `${this.mentorNames[itemId]} (Mentor)`;
    } else if (this.bobocNames[itemId]) {
      return `${this.bobocNames[itemId]} (Boboc)`;
    } else {
      return 'Necunoscut';
    }
  }
}
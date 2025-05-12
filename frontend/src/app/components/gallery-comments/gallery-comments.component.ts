import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-gallery-comments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-comments-section">
      <h2 class="section-title">Comentarii recente</h2>
      
      <div *ngIf="isLoading" class="loading-comments">
        <p>Se încarcă comentariile...</p>
      </div>
      
      <div *ngIf="!isLoading && comments.length === 0" class="no-comments">
        <p>Nu există comentarii încă. Vizitează paginile de detalii ale mentorilor și bobocilor pentru a adăuga primul comentariu!</p>
      </div>
      
      <div *ngIf="!isLoading && comments.length > 0" class="comments-grid">
        <div *ngFor="let comment of comments" class="comment-card">
          <div class="comment-header">
            <h3 class="comment-author">{{ comment.userName }}</h3>
            <span class="comment-date">{{ comment.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>
          <div class="comment-content">
            <p>{{ comment.content }}</p>
          </div>
          <div class="comment-footer">
            <span class="comment-target">La: {{ getTargetName(comment.itemId) }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-comments-section {
      margin: 4rem 0;
      padding: 0 2rem;
    }
    
    .section-title {
      margin-bottom: 2rem;
      font-size: 1.8rem;
      color: #2c3e50;
      font-weight: 600;
      text-align: center;
      position: relative;
      padding-bottom: 10px;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: linear-gradient(to right, #3498db, #2980b9);
        border-radius: 3px;
      }
    }
    
    .loading-comments, .no-comments {
      text-align: center;
      padding: 2rem;
      font-style: italic;
      color: #777;
    }
    
    .comments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .comment-card {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }
    }
    
    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .comment-author {
      font-size: 1.2rem;
      color: #3498db;
      margin: 0;
    }
    
    .comment-date {
      font-size: 0.8rem;
      color: #95a5a6;
    }
    
    .comment-content {
      flex-grow: 1;
      margin-bottom: 1rem;
      
      p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
        color: #555;
      }
    }
    
    .comment-footer {
      font-size: 0.9rem;
      color: #7f8c8d;
      font-style: italic;
    }
    
    @media (max-width: 768px) {
      .comments-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
    }
    
    @media (max-width: 480px) {
      .comments-grid {
        grid-template-columns: 1fr;
      }
    }
    
    :host-context(.dark-mode) {
      .section-title {
        color: #f5f6fa;
        
        &::after {
          background: linear-gradient(to right, #74b9ff, #0984e3);
        }
      }
      
      .loading-comments, .no-comments {
        color: #a0a0a0;
      }
      
      .comment-card {
        background-color: #2d3436;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        
        &:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
      }
      
      .comment-author {
        color: #74b9ff;
      }
      
      .comment-date {
        color: #95a5a6;
      }
      
      .comment-content p {
        color: #dcdde1;
      }
      
      .comment-footer {
        color: #b2bec3;
      }
    }
  `]
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
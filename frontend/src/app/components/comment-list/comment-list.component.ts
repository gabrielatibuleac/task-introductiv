import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="comments-container">
      <h3>Comentarii</h3>
      
      <div *ngIf="isLoading" class="loading">
        <p>Se încarcă comentariile...</p>
      </div>
      
      <div *ngIf="!isLoading && comments.length === 0" class="no-comments">
        <p>Nu există comentarii încă. Fii primul care lasă un comentariu!</p>
      </div>
      
      <div *ngIf="!isLoading && comments.length > 0" class="comments-list">
        <div *ngFor="let comment of comments" class="comment-item">
          <div class="comment-header">
            <span class="comment-author">{{ comment.userName }}</span>
            <span class="comment-date">{{ comment.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>
          <div class="comment-content">
            {{ comment.content }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .comments-container {
      margin-top: 1.5rem;
    }
    
    h3 {
      font-size: 1.4rem;
      color: #3498db;
      margin-bottom: 1rem;
    }
    
    .loading, .no-comments {
      padding: 1rem;
      font-style: italic;
      color: #777;
    }
    
    .comments-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .comment-item {
      padding: 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .comment-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .comment-author {
      font-weight: bold;
      color: #3498db;
    }
    
    .comment-date {
      color: #777;
    }
    
    .comment-content {
      font-size: 1rem;
      line-height: 1.4;
    }
    
    :host-context(.dark-mode) {
      .comment-item {
        background-color: #2d3436;
      }
      
      .comment-content {
        color: #dcdde1;
      }
      
      .comment-date, .loading, .no-comments {
        color: #a0a0a0;
      }
    }
  `]
})
export class CommentListComponent implements OnInit {
  @Input() itemId!: string;
  comments: Comment[] = [];
  isLoading = true;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    console.log('CommentList initialized, itemId:', this.itemId);
    this.loadComments();
  }
  
  loadComments(): void {
    console.log('Starting to load comments for itemId:', this.itemId);
    
    if (!this.itemId) {
      console.warn('No itemId provided, skipping comment loading');
      this.isLoading = false;
      return;
    }
    
    this.commentService.getCommentsByItemId(this.itemId)
      .subscribe({
        next: (comments) => {
          console.log('Successfully loaded comments:', comments);
          this.comments = comments;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading comments:', error);
          this.isLoading = false; // Make sure to set isLoading to false even on error
        },
        complete: () => {
          console.log('Comment loading observable completed');
        }
      });
  }

  refreshComments(): void {
    this.isLoading = true;
    this.loadComments();
  }
}
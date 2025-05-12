import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
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
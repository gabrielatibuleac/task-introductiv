import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() itemId!: string;
  @Output() commentAdded = new EventEmitter<boolean>();
  
  newComment: Comment = {
    userId: Math.floor(Math.random() * 10000), 
    userName: '',
    content: '',
    itemId: ''
  };
  
  isSubmitting = false;
  submitError = false;
  submitSuccess = false;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    if (this.itemId) {
      this.newComment.itemId = this.itemId;
    }
  }

  submitComment(): void {
    this.isSubmitting = true;
    this.submitError = false;
    this.submitSuccess = false;
    
    this.newComment.itemId = this.itemId;
    
    this.commentService.addComment(this.newComment)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          
          this.newComment = {
            userId: Math.floor(Math.random() * 10000),
            userName: '',
            content: '',
            itemId: this.itemId
          };
          
          this.commentAdded.emit(true);
          
          setTimeout(() => {
            this.submitSuccess = false;
          }, 3000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitError = true;
          console.error('Error submitting comment:', error);
        }
      });
  }
}
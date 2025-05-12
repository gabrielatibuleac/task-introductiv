import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comment-form-container">
      <h3>Lasă un comentariu</h3>
      
      <form (ngSubmit)="submitComment()" #commentForm="ngForm">
        <div class="form-group">
          <label for="userName">Nume *</label>
          <input 
            type="text" 
            id="userName" 
            name="userName" 
            [(ngModel)]="newComment.userName" 
            required 
            #userName="ngModel"
            placeholder="Numele tău"
            class="form-control"
          >
          <div *ngIf="userName.invalid && (userName.dirty || userName.touched)" class="error-message">
            Numele este obligatoriu
          </div>
        </div>
        
        <div class="form-group">
          <label for="content">Comentariu *</label>
          <textarea 
            id="content" 
            name="content" 
            [(ngModel)]="newComment.content" 
            required 
            #content="ngModel"
            placeholder="Scrie comentariul tău aici..."
            class="form-control"
            rows="4"
          ></textarea>
          <div *ngIf="content.invalid && (content.dirty || content.touched)" class="error-message">
            Comentariul este obligatoriu
          </div>
        </div>
        
        <button 
          type="submit" 
          class="submit-btn" 
          [disabled]="commentForm.invalid || isSubmitting"
        >
          {{ isSubmitting ? 'Se trimite...' : 'Trimite comentariul' }}
        </button>
        
        <div *ngIf="submitError" class="submit-error">
          A apărut o eroare la trimiterea comentariului. Te rugăm să încerci din nou.
        </div>
        
        <div *ngIf="submitSuccess" class="submit-success">
          Comentariul tău a fost trimis cu succes!
        </div>
      </form>
    </div>
  `,
  styles: [`
    .comment-form-container {
      margin-top: 1.5rem;
    }
    
    h3 {
      font-size: 1.4rem;
      color: #3498db;
      margin-bottom: 1rem;
    }
    
    .form-group {
      margin-bottom: 1.2rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
    
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
    
    .error-message {
      margin-top: 0.3rem;
      color: #e74c3c;
      font-size: 0.9rem;
    }
    
    .submit-btn {
      padding: 0.8rem 1.5rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .submit-btn:hover:not(:disabled) {
      background-color: #2980b9;
    }
    
    .submit-btn:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }
    
    .submit-error {
      margin-top: 1rem;
      padding: 0.8rem;
      background-color: #ffebee;
      color: #e74c3c;
      border-radius: 8px;
    }
    
    .submit-success {
      margin-top: 1rem;
      padding: 0.8rem;
      background-color: #e8f5e9;
      color: #2ecc71;
      border-radius: 8px;
    }
    
    :host-context(.dark-mode) {
      .form-control {
        background-color: #2d3436;
        border-color: #3d3d3d;
        color: #f5f6fa;
      }
      
      .form-control:focus {
        border-color: #74b9ff;
        box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.2);
      }
      
      .submit-btn {
        background-color: #74b9ff;
      }
      
      .submit-btn:hover:not(:disabled) {
        background-color: #0984e3;
      }
      
      .submit-btn:disabled {
        background-color: #636e72;
      }
      
      .submit-error {
        background-color: #4b1818;
        color: #ff7675;
      }
      
      .submit-success {
        background-color: #1b4332;
        color: #55efc4;
      }
    }
  `]
})
export class CommentFormComponent {
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
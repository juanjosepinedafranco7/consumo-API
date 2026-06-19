import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../../../core/models/comment.model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  // Estado local del componente
  comments: Comment[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private readonly commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }


  private loadComments(): void {
    this.commentService.getComments().subscribe({
      next: (data) => {
        this.comments = data.slice(0, 15);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al cargar los comentarios. Inténtalo de nuevo.';
        this.loading = false;
        console.error('Error de API:', err);
      }
    });
  }
}

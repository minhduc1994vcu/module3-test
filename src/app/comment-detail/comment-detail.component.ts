import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../comment.service';
import {Comment} from '../comment';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {
  comments: Comment;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.getCommentById(id).subscribe(
      comments => (this.comments = comments),
      error => {
        console.log(error);
        this.comments = null;
      }
    );
  }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service';
import {IPost} from '../post';
import {Comment} from '../comment';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post: IPost;
  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => {
        this.post = next;
        this.commentService.getCommentsByPostId(id).subscribe(comments => {
            // @ts-ignore
            this.comments = comments;
          },
          error => {
            console.log(error);
            this.post = null;
          }
        );
      });
  }
}

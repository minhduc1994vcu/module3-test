import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service';
import {IPost} from '../post';
import {Comment} from '../comment';
import {CommentService} from '../comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post: IPost;
  comments: Comment[];
  comment: Comment;

  commentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder,

  ) {
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => {
        this.post = next;
        this.commentService.getCommentsByPostId(id).subscribe( comments => {
          // @ts-ignore
          this.comments = comments;
        });
      },
      error => {
        console.log(error);
        this.post = null;
      }
    );
  }
  onSubmit() {
    if (this.commentForm.valid) {
      const {value} = this.commentForm;
      const data = {
        ...this.comment,
        ...value
      };
      this.commentService.createComment(data)
        .subscribe(next => {
          console.log('create Comment success');
          console.log(next);
          this.comments.unshift(next);
          this.commentForm.reset({
            name: '',
            email: '',
            body: ''
          });
        }, error => console.log(error));
    }
  }
  deleteComment(i) {
    const comment = this.comments[i];
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.comments = this.comments.filter(t => t.id !== comment.id);
    });
  }
}

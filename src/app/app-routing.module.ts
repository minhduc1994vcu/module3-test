import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import {CommentDetailComponent} from './comment-detail/comment-detail.component';

const routes: Routes = [{
  path: 'blog',
  component: BlogComponent
}, {
  path: 'blog/:id',
  component: BlogDetailComponent
}, {
  path: 'blog/:id/edit',
  component: BlogEditComponent
},
  {
    path: 'comment/:id',
    component: CommentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

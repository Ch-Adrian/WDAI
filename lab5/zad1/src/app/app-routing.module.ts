import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PhotosComponent } from './photos/photos.component';
import { HomeComponent } from './home/home.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'posts', component: PostsComponent},
  {path: 'photos/:id', component: PhotoViewComponent },
  {path: 'photos', component: PhotosComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, PostsComponent,PhotosComponent,PhotoViewComponent];
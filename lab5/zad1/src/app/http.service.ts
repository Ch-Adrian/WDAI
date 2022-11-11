import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from './photo';
import { IPost } from './post';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url_posts:string="https://jsonplaceholder.typicode.com/posts";
  url_photos:string="https://jsonplaceholder.typicode.com/photos";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]>{
    return this.http.get<IPost[]>(this.url_posts);
  }

  getPhotos(): Observable<IPhoto[]>{
    return this.http.get<IPhoto[]>(this.url_photos);
  }

  addPost(post: IPost){
    this.http.post(this.url_posts, post);
  }

  getPhotoFromId(id: any){
    let photo: any;
    this.getPhotos().subscribe(data =>{
      photo = data.find( data_obj => data_obj.id == id);
    })
    return photo;
  }

}

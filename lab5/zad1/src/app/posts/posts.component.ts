import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { IPost } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: Array<IPost> = [];
  public outPost: IPost;
  form: FormGroup;

  constructor(public hService: HttpService, private formuilder:FormBuilder) {

    this.form = this.formuilder.group({
      userId: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      id: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    })

     this.outPost = {'userId': 0, 'id': 0, 'title': "title", 'body': "BODY"};
   }

  ngOnInit(): void {
    this.hService.getPosts().subscribe(data => this.posts = data)
  }

  postData(){
    if(this.form != undefined){
      if(this.form.get('userId')?.invalid ||
        this.form.get('id')?.invalid ||
        this.form.get('title')?.invalid ||
        this.form.get('body')?.invalid){
          return;
        }
        this.outPost = {
          'userId': this.form.value.userId,
          'id': this.form.value.id, 
          'title': this.form.value.title,
          'body': this.form.value.body};
        this.hService.addPost(this.outPost);
        this.form.reset();
    }
  }


}

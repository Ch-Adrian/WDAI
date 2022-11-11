import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { IPhoto } from '../photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public photos: Array<IPhoto> = [];

  constructor(private hService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.hService.getPhotos().subscribe(data => this.photos=data);
  }

  routeTo(obj: IPhoto){
      this.router.navigate(['photos', obj.id], 
      {state: {url: obj.url} });
  }

}

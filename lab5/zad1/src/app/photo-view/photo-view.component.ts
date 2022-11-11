import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { IPhoto } from '../photo';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css']
})
export class PhotoViewComponent implements OnInit {

  photo: IPhoto;
  photoUrl: string = "";

  constructor(private active:ActivatedRoute,
    private router:Router,
    public hService: HttpService) { 

      this.photo = {'albumId': 0, 'id': '1', 'title': 'title', 'url': 'adres', 'thumbnailUrl': 'adres2'}
      let URL = this.router.getCurrentNavigation()?.extras.state;
      if(URL){
        this.photoUrl = URL['url']
      }
    }

  ngOnInit(): void {
    
  }

  onBack(){
    this.router.navigate(['/photos']);
  }

}

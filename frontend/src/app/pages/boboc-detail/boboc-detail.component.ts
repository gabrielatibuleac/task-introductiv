import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from '../../shared/models/image.model';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';

@Component({
  selector: 'app-boboc-detail',
  templateUrl: './boboc-detail.component.html',
  styleUrls: ['./boboc-detail.component.scss']
})
export class BobocDetailComponent implements OnInit {
  boboc?: Image;

  constructor(
    private route: ActivatedRoute,
    private gallery: ImageGalleryComponent
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.boboc = this.gallery.getBobocImages().find(b => b._id === id);
  }
}
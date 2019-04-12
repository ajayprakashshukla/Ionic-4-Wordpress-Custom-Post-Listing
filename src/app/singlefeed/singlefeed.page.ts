import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServiceForAllService } from '../service-for-all.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singlefeed',
  templateUrl: './singlefeed.page.html',
  styleUrls: ['./singlefeed.page.scss'],
})
export class SinglefeedPage implements OnInit {
  post: any;
  constructor(private route: ActivatedRoute,public serviceForAllService:ServiceForAllService, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.serviceForAllService.getPostContent(id).subscribe(res => {
      this.post = res;
    });
  }
 
  openOriginal() {
    // Add InAppBrowser for app if want
    window.open(this.post.link, '_blank');
  }
}

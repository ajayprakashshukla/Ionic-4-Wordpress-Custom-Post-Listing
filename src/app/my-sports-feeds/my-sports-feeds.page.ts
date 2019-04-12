import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServiceForAllService } from '../service-for-all.service';


@Component({
  selector: 'app-my-sports-feeds',
  templateUrl: './my-sports-feeds.page.html',
  styleUrls: ['./my-sports-feeds.page.scss'],
})
export class MySportsFeedsPage implements OnInit {
  posts = [];
  page = 1;
  count = null;

  constructor(public serviceForAllService:ServiceForAllService, public loadingCtrl: LoadingController) {

   }

  ngOnInit() {
    this.loadPosts();
  }


  async loadPosts() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading feed...'
    });
    await loading.present();
 
    this.serviceForAllService.getPosts().subscribe(res => {
      this.count = this.serviceForAllService.totalPosts;
      this.posts = res;
      loading.dismiss();
    });
  }
 
  loadMore(event) {
    this.page++;
 
    this.serviceForAllService.getPosts(this.page).subscribe(res => {
      this.posts = [...this.posts, ...res];
      event.target.complete();
 
      // Disable infinite loading when maximum reached
      if (this.page == this.serviceForAllService.pages) {
        event.target.disabled = true;
      }
    });
  }




}

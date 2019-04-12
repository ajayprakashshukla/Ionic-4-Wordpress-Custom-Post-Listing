import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './side-menu/styles/side-menu.scss',
    './side-menu/styles/side-menu.shell.scss',
    './side-menu/styles/side-menu.responsive.scss'
  ]
})
export class AppComponent {
  appPages = [
    {
      title: 'My Feeds',
      url: '/app/categories',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    },
  ];
  accountPages = [
    {
      title: 'Log In',
      url: '/auth/login',
      icon: './assets/sample-icons/side-menu/login.svg'
    },
    {
      title: 'Sign Up',
      url: '/auth/signup',
      icon: './assets/sample-icons/side-menu/signup.svg'
    },
    {
      title: 'Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    },
    {
      title: 'Getting Started',
      url: '/getting-started',
      icon: './assets/sample-icons/side-menu/getting-started.svg'
    },
    {
      title: '404 page',
      url: '/page-not-found',
      icon: './assets/sample-icons/side-menu/warning.svg'
    }
  ];

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public storage:Storage,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('user').then((val) => {
        console.log(" USER LOGIN "+JSON.stringify(val));
        if (val) {
         
          this.router.navigate(['/app/categories']);
          console.log('loging user true');
        } else {
         
         
          this.router.navigate(['/auth/login']);

        }
      });
    });
  }

  logout(){ 
    this.menu.toggle();
    this.DoLogout();
  }

  async DoLogout(){
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: "Are you sure?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.storage.clear();
            this.router.navigate(['/auth/login']);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        }
      ],
      cssClass: 'comment-alert'
    });

    await alert.present();
  }
}

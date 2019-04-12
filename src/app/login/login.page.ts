
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController,NavController,MenuController } from '@ionic/angular';
import { ServiceForAllService } from '../service-for-all.service';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder,FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss'
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  response:any;
  loading: any; 

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
    
  };

  constructor(
    public storage:Storage,public alertCtrl: AlertController, public loadingCtrl: LoadingController,public navController:NavController,
    public serviceForAllService:ServiceForAllService,public events:Events,private router: Router,public menu: MenuController
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }


  doLogin(){ 
    console.log(this.loginForm);
     let email= this.loginForm.value.email;
      let password= this.loginForm.value.password;
      this.showLoader();
      this.serviceForAllService.doLogin(email,password).subscribe((result) => {
           console.log('result here',result);
           this.response= result;
           if(this.response.token){
              console.log('login success');
              this.loading.dismiss();
              this.storage.set('user', this.response);
             //  this.router.navigateByUrl('profile');
               
             this.router.navigate(['/app/categories/sportfeed']);
              //----------------------------------------------------
               
           }
         }, (err) => {
           this.loading.dismiss();
           let msg= 'Username or password is invalid';
           this.presentAlert(msg);
       }); 
   }

   async showLoader(){
    this.loading = await this.loadingCtrl.create({message: 'Please wait...'});
    this.loading.present();
  } 

  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToForgotPassword(): void {
    console.log('redirect to forgot-password page');
  }

}

import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, MenuController, LoadingController,AlertController } from '@ionic/angular';
import { ServiceForAllService } from '../service-for-all.service';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { PasswordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: [
    './styles/signup.page.scss'
  ]
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  reg_result:any;
  loading: any; 

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],'selectplayer': [
      { type: 'required', message: 'Player is required.' },
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };

  constructor(
    public router: Router,
    public modalController: ModalController,
    public menu: MenuController,
    public serviceForAllService:ServiceForAllService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.matching_passwords_group = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.signupForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'matching_passwords': this.matching_passwords_group,
      'selectplayer': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'name': new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServicePage
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }

 

  doSignup(){
    
    const newPassword = this.signupForm.value.password // to get value in input tag
    const confirmPassword = this.signupForm.value.cpassword // to get value in input tag
   

    this.showLoader();

    // get registration nonce
    let user_data = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role:this.signupForm.value.selectplayer,
        name:this.signupForm.value.name
      };

      console.table(user_data);
      this.serviceForAllService.doRegister(user_data).subscribe((result) => {
          console.log('final result here====',result);
          this.reg_result= result;
          console.table(this.reg_result);

          this.loading.dismiss();
          if(this.reg_result.status=='ok'){
            //  let msg= this.reg_result.msg;
             this.presentAlert("Register Successfully!!");
              this.router.navigate(['auth/login']);
          }else{
             this.loading.dismiss();
             let msg= 'Error';
             this.presentAlert(msg);
          }
          
      }, (err) => {
          this.loading.dismiss();
          console.log("error hai..",err);
          let msg= err.error.errormsg;
          this.presentAlert(msg);

      });
    
       
    
  }


  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({message: 'Please wait...'});
    this.loading.present();
  }

 
}

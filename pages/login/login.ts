import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authservice: AuthProvider) {
    this.credentials.email = '';
    this.credentials.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.credentials.email == '' || this.credentials.password == '') {
      toaster.setMessage('All fields are required.');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.authservice.login(this.credentials).then((res: any) => {
        if (!res.code) {
          loader.dismiss();
          this.navCtrl.setRoot('TabsPage');
        }
        else {
          loader.dismiss();
          toaster.setMessage('Invalid Email/Password.');
          toaster.present();
          alert(res);
        }
      })
    }
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }
}

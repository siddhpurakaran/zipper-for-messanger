import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.email = '';
  }

  reset() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.email == '') {
      toaster.setMessage('Email is required.');
      toaster.present();
    }
    else {
      let alert = this.alertCtrl.create({
        buttons: ['Ok']
      });
      this.userservice.passwordreset(this.email).then((res: any) => {
        if (res.success) {
          alert.setTitle('Email Sent');
          alert.setSubTitle('Please follow the instructions in the email to reset your password');
        }
      }).catch((err) => {
        alert.setTitle('Failed');
        alert.setSubTitle(err);
      })
    }
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}

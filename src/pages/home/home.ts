import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../../config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public app_link: string;
  public options: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public iab: InAppBrowser,
    public platform: Platform,
    public oneSignal: OneSignal
  ) {
    this.options = {
      location: 'no',
      clearcache: 'no',
      toolbar: 'no'
    }
  }

  ngOnInit(){
    this.platform.ready().then(() => {
      if (isCordovaAvailable()) {
        this.oneSignal.setSubscription(true);
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.getIds().then((res) => {
          this.app_link = 'https://app.holidayhomebuyer.co.uk?player=' + res.userId;
          this.iab.create(this.app_link, '_blank', this.options);
        });
      }
    });
  }

  goApp() {
    this.iab.create(this.app_link, '_blank', this.options);
  }
}

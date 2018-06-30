import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    oneSignal: OneSignal
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (isCordovaAvailable()) {
        console.log(oneSignalAppId, sender_id);
        oneSignal.setSubscription(true);
        oneSignal.startInit(oneSignalAppId, sender_id);
        oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.Notification);
        oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        oneSignal.endInit();
      }

    });
  }

  private onPushReceived(payload: OSNotificationPayload) {
    // alert('Push recevied:' + payload.body);
  }

  private onPushOpened(payload: OSNotificationPayload) {
    // alert('Push opened: ' + payload.body);
  }
}


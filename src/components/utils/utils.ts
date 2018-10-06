import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the UtilsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'utils',
  templateUrl: 'utils.html'
})
export class UtilsComponent {

  text: string;

  constructor(public toastCtrl:ToastController) {
    console.log('Hello UtilsComponent Component');
    this.text = 'Hello World';
  }

  public presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'botton'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

  }
  
}

import { ResultadoSorteioPage } from './../resultado-sorteio/resultado-sorteio';
import { OutrasListasPage } from './../outras-listas/outras-listas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelVagasPage } from '../sel-vagas/sel-vagas';

/**
 * Generated class for the SorteioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sorteio',
  templateUrl: 'sorteio.html',
})
export class SorteioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SorteioPage');
  }
  goListaVagas() {
    this.navCtrl.push(SelVagasPage);
  }

  goOutrasListas() {
    this.navCtrl.push(OutrasListasPage);
  }

  goToResultadoSorteio() {
    this.navCtrl.push(ResultadoSorteioPage);
  }

}

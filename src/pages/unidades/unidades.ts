import { SorteioPage } from './../sorteio/sorteio';
import { MuralPage } from './../mural/mural';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IUnidade } from '../../interfaces/IUnidade';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the UnidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unidades',
  templateUrl: 'unidades.html',
})
export class UnidadesPage {
  
  unidades:IUnidade[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public usuariosProvider: UsuariosProvider
  ) {
    this.unidades = this.navParams.get('unidades');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnidadesPage');
  }
  goMural(selUnidade:IUnidade) {
    this.usuariosProvider.setStorage("unidade",selUnidade);
    // this.navCtrl.setRoot(MuralPage, {unidade: selUnidade}); // SOSORTEIO - Comentado para o app trabalhar só para sorteio
    this.navCtrl.setRoot(SorteioPage);
  }
}

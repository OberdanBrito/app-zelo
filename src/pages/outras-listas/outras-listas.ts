import { CondominioProvider } from './../../providers/condominio/condominio';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { IUnidade } from './../../interfaces/IUnidade';
import { DetalheListaPage } from './../detalhe-lista/detalhe-lista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OutrasListasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outras-listas',
  templateUrl: 'outras-listas.html',
})
export class OutrasListasPage {

  unidadeUsuario:IUnidade;
  unidades:IUnidade[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuariosProvider:UsuariosProvider,
    public condominioProvider:CondominioProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutrasListasPage');
    this.usuariosProvider.getStorage("unidade").then(res => {
      this.unidadeUsuario = res;
      console.log("res.condominio_id: "+res.condominio_id);
      this.condominioProvider.getUnidades(res.condominio_id, 0).subscribe(res => {
        console.log("res: "+res);
        this.unidades = res;
      }, erro => {
        console.log("Erro: " + erro.message);
      });
    });
  }

  goToDetalheLista(unid:IUnidade) {
    this.navCtrl.push(DetalheListaPage, {unidade: unid});
  }
}

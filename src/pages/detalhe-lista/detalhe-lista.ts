import { IUnidade } from './../../interfaces/IUnidade';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { IVaga } from './../../interfaces/IVaga';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalheListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-lista',
  templateUrl: 'detalhe-lista.html',
})
export class DetalheListaPage {
  
  vagas:IVaga[] = [];
  unidade:IUnidade;
  dataSorteio:Date = new Date('02/28/2019');
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public condominioProvider:CondominioProvider
    ) {
      this.unidade = this.navParams.get("unidade");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheListaPage');
    this.getLista();

  }
  
  getLista() {
    console.log("unidade.id: "+this.unidade.id);
    this.condominioProvider.getListaVagas(this.unidade, this.dataSorteio).subscribe(res => {
      this.vagas = res;
    }, erro => {
      console.log("Erro: "+erro.Message);
    });
  }
}

import { IUnidade } from './../../interfaces/IUnidade';
import { CriarProblemaPage } from './../criar-problema/criar-problema';
import { ProblemaProvider } from './../../providers/problema/problema';
import { DetalheProblemaPage } from './../detalhe-problema/detalhe-problema';
import { IProblema } from './../../interfaces/IProblema';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MuralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mural',
  templateUrl: 'mural.html',
})
export class MuralPage {

  problemas:IProblema[] = [];
  unidade:IUnidade;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provProblema: ProblemaProvider
    ) {
      this.unidade = this.navParams.get("unidade");
    }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MuralPage');
    this.provProblema.getProblemasCondominio(this.unidade).subscribe(res => {
      console.log('res: '+res);
      this.problemas = res;
    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }

  goToDetalheProblema(params) {
    this.navCtrl.push(DetalheProblemaPage,{itemSelected:params});
  }
  goToCriarProblema() {
    this.navCtrl.push(CriarProblemaPage);
  }

}

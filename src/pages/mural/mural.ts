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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provProblema: ProblemaProvider
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuralPage');
    this.provProblema.getProblemasCondominio().subscribe(res => {
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

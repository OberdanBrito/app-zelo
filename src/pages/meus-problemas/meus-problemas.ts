import { ProblemaProvider } from './../../providers/problema/problema';
import { IProblema } from './../../interfaces/IProblema';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalheProblemaPage } from '../detalhe-problema/detalhe-problema';
import { CriarProblemaPage } from '../criar-problema/criar-problema';

@Component({
  selector: 'page-meus-problemas',
  templateUrl: 'meus-problemas.html'
})
export class MeusProblemasPage {

  problemas:IProblema[] = [];

  constructor(
    public navCtrl: NavController,
    public provProblema: ProblemaProvider
  ) { }
  
  ionViewWillEnter() {
    this.provProblema.getProblemasMorador().subscribe(res => {
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

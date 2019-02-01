import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { SorteioProvider } from './../../providers/sorteio/sorteio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultadoSorteioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado-sorteio',
  templateUrl: 'resultado-sorteio.html',
})
export class ResultadoSorteioPage {
  
  resultado:any[] = [{
                andar:"",
                vaga:0,
                unidade:0,
                torre:""
              }];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sorteioProvider:SorteioProvider,
    public usuariosProvider:UsuariosProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoSorteioPage');
    this.getResultadoSorteio();
  }

  getResultadoSorteio() {
    this.usuariosProvider.getStorage('unidade').then(unidade => {
      console.log("unidade.condominio_id: "+unidade.condominio_id);
      this.sorteioProvider.getResultadoSorteio(unidade.condominio_id).subscribe(res => {
        this.resultado = res;
      }, erro => {
        console.log('Erro: '+erro.message);  
      });
    }, erro => {
      console.log('Erro: '+erro.message);
    });
  }
}

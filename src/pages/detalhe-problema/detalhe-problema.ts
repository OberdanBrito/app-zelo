import { AcaoProblemaPage } from './../acao-problema/acao-problema';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { IUsuario } from './../../interfaces/IUsuario';
import { ProblemaProvider } from './../../providers/problema/problema';
import { IProblema } from './../../interfaces/IProblema';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
//import { dateDataSortValue } from '../../../node_modules/ionic-angular/umd/util/datetime-util'; // import apareceu de repente

/**
 * Generated class for the DetalheProblemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-problema',
  templateUrl: 'detalhe-problema.html',
})
export class DetalheProblemaPage {


  problema:IProblema = {
    id:null,
    titulo:"",
    fone:"",
    descricao:"",
    local_id:null,
    tipo_id:null,
    status:"",
    data:null,
    fotos:['']
  };
  morador:IUsuario = {name:'', 
                      email:'',                       
                      condominio_id:null, 
                      torre_id:null,
                      unidade:null,
                      foto:''
                    };
  habilitaAção:boolean = false;
  usuario:IUsuario = {id:null, email:''};
  iconStatus:string = '';
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public provProblema: ProblemaProvider,
      public provUsuario: UsuariosProvider,
      public popoverCtrl: PopoverController
  ) {
    this.problema = this.navParams.get('itemSelected');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheProblemaPage');
    this.provUsuario.getStorage("usuario").then(res => {
      this.usuario = res;
    });
    this.provProblema.getMoradorProblema(this.problema).subscribe(res => {
      this.morador = res;
      
      if (this.morador.foto == null) {
        this.morador.foto = 'fotoPerfil.png';
      }
    }, erro => {
      console.log("Erro: " + erro.message);
    });

    this.provProblema.getFotosProblemas(this.problema).subscribe(res => {
      this.problema.fotos = res;
    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(AcaoProblemaPage, {problema: this.problema});
    popover.present({
      ev: myEvent
    });
  }

}

import { IUnidade } from './../../interfaces/IUnidade';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { IListaVaga } from './../../interfaces/IListaVaga';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { IVaga } from './../../interfaces/IVaga';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SelVagasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sel-vagas',
  templateUrl: 'sel-vagas.html',
})
export class SelVagasPage {
  
  vagas:IVaga[] = [];
  newVaga:IVaga = {id:null, vaga:null, andar:""};
  listaAndaresGaragem:string[] = [];
  listaVagasGaragem:IVaga[] = [];
  listaVagas:IVaga[] = [];
  unidade:IUnidade;
  dataSorteio:Date = new Date('02/28/2019');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public condominioProvider:CondominioProvider,
    public usuariosProvider:UsuariosProvider,
    private toastCtrl: ToastController,
    public loadingCtrl:LoadingController
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelVagasPage');
    this.usuariosProvider.getStorage("unidade").then(res => {
      this.unidade = res;
      this.lstAndaresGaragem();
      this.condominioProvider.getListaVagas(res, this.dataSorteio).subscribe(listaAtual => {
        this.vagas = listaAtual;
      }, erro => {
        console.log("Erro: " + erro.message);
      });
    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }

  addVaga() {
    let repetida:boolean = false;
    if (this.newVaga.vaga != null || this.newVaga.andar != "") {
      for (let i = 0; i < this.vagas.length; i++) {
        if (this.vagas[i].andar == this.newVaga.andar && this.vagas[i].vaga == this.newVaga.vaga) {
          this.presentToast("Esta vaga já está na sua lista!");
          repetida = true;
          return;
        }
      }
      if (!repetida) {
        this.vagas.push(this.newVaga);
        this.newVaga = {id:null, vaga:null, andar:""};    
      }
    }
  }
  clsVagas() {
    this.vagas = [];
  }
  delVaga(item:number) {
    let auxVagas:IVaga[] = [];
    for (let i = 0; i < this.vagas.length; i++) {
      if (i != item) {
        auxVagas.push(this.vagas[i]);
      }
    }
    this.vagas = auxVagas;
  }

  lstAndaresGaragem() {
    console.log('this.unidade.condominio_id: '+this.unidade.condominio_id);
    this.condominioProvider.allVagasGaragem(this.unidade).subscribe(res => {
      this.listaVagasGaragem = res;
      this.listaAndaresGaragem = Array.from(new Set(this.listaVagasGaragem.map(a => a.andar)));
      console.log("listaAndaresGaragem: "+this.listaAndaresGaragem);
    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }

  lstVagas(andar:string) {
      this.listaVagas = this.listaVagasGaragem.filter(a => a.andar === andar);
  }

  addLista() {

    let load = this.loadingCtrl.create({
      content:'Aguarde...',
      duration: 14000
    });
    load.present();
    let dadosSorteio = {unidade_id:this.unidade.id,
                        dataSorteio:this.dataSorteio.toDateString()};
    this.condominioProvider.delListaVagas(dadosSorteio).subscribe(res => {

      let vaga:IListaVaga[] = [];
      for (let i = 0; i < this.vagas.length; i++) {
        let vagaDaLista:IVaga[] = this.listaVagasGaragem.filter(a => (a.andar == this.vagas[i].andar && a.vaga == this.vagas[i].vaga));
        vaga.push({
          dataSorteio:this.dataSorteio,
          unidade_id: this.unidade.id,
          prioridade: i+1,
          vaga_id:    vagaDaLista.map(a => a.id)[0]
        });
      }

      this.condominioProvider.addListaVagas(vaga).subscribe(res => {
        console.log("vagas: "+res);
        this.presentToast("A sua lista de vagas foi criada!");
        load.dismiss();
      }, erro => {
        console.log("Erro: " + erro.message);
        this.presentToast("Erro na criação da sua lista: "+erro.message);
        load.dismiss();
      });  

    }, erro => {
      console.log("Erro: " + erro.message);
      this.presentToast("Erro na criação da sua lista: "+erro.message);
      load.dismiss();
    });  

    this.navCtrl.pop();

  }

  presentToast(msg:string) {
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

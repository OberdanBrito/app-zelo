import { UnidadesPage } from './../unidades/unidades';
import { SorteioPage } from './../sorteio/sorteio';
import { IUnidade } from './../../interfaces/IUnidade';
import { MuralPage } from './../mural/mural';
import { IUsuario } from './../../interfaces/IUsuario';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { UtilsComponent } from './../../components/utils/utils';
import { ITorre } from './../../interfaces/ITorre';
import { ICondominio } from './../../interfaces/ICondominio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SelectCondominioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-condominio',
  templateUrl: 'select-condominio.html',
})
export class SelectCondominioPage extends UtilsComponent {

  usuario: IUsuario = {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
    sexo:'',
    nascimento:null,
    condominio_id: null,
    torre_id: null,
    unidade: null,
    foto: '',
    validador: ''
  };

  listaCondominios: ICondominio[] = [];
  listaTorres: ITorre[] = [];
  listaUnidades: IUnidade[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuariosProvider: UsuariosProvider, 
    public condominioProvider: CondominioProvider, 
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController
    ) {
      super(toastCtrl);
      this.usuario = this.navParams.get('pUsuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCondominioPage');
    this.lstCondominios();
  }

  lstCondominios() {
    this.condominioProvider.allCondominios().subscribe(res => {
      this.listaCondominios = res;
    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }
  lstTorres(idCondominio: number) {
    this.condominioProvider.getTorres(idCondominio).subscribe(res => {
      this.listaTorres = res;
      this.usuario.torre_id = null;
    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }
  lstUnidades(idCondominio: number,
              idTorre:number) {
    this.condominioProvider.getUnidades(idCondominio,
                                        idTorre).subscribe(res => {
      
      let temUnidade = res[0].unidade;
      console.log("temUnidade: "+temUnidade);
      if (temUnidade) {
        this.listaUnidades = res;
      } else {
        this.listaUnidades = [];
        this.presentToast("Não há unidades disponíveis nesta torre!");
      }
      this.usuario.unidade = null;
    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }

  addUsuario() {
    let load = this.loadingCtrl.create({
      content:'Aguarde...',
      duration: 14000
    });
    load.present();
    this.usuariosProvider.addUsuario(this.usuario).subscribe(res => {
      load.dismiss();
      if (res.name) {
        let unidade:IUnidade = {
          condominio_id:this.usuario.condominio_id,
          torre_id:this.usuario.torre_id,
          unidade:this.usuario.unidade
        };
        this.usuariosProvider.setStorage("usuario", res);
        this.usuariosProvider.setStorage("unidade",unidade);
        localStorage.setItem("token", res.token);
        this.presentToast("Olá, " + res.name + "! Seja bem vindo(a) :)");
        //this.ativaMenuLogin();
        //this.navCtrl.setRoot(MuralPage); // SOSORTEIO - Comentado para o app trabalhar só para sorteio
        this.navCtrl.setRoot(SorteioPage);
        console.log(res);
      }
      else {        
        this.presentToast("Erro na criação do usuário: " + res.email);
      }
    }, erro => {
      load.dismiss();
      this.presentToast("Erro na criação do usuário: " + erro.message);
      console.log("Erro: " + erro.message);
    });
    
  }
}

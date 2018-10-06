import { MuralPage } from './../mural/mural';
import { IUsuario } from './../../interfaces/IUsuario';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { UtilsComponent } from './../../components/utils/utils';
import { ITorre } from './../../interfaces/ITorre';
import { ICondominio } from './../../interfaces/ICondominio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuariosProvider: UsuariosProvider, 
    public condominioProvider: CondominioProvider, 
    public toastCtrl: ToastController
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

  addUsuario() {
    this.usuariosProvider.addUsuario(this.usuario).subscribe(res => {
      if (res.name) {
        this.usuariosProvider.setStorage("usuario", res);
        localStorage.setItem("token", res.token);
        this.presentToast("Olá, " + res.name + "! Seja bem vindo(a) :)");
        //this.ativaMenuLogin();
        this.navCtrl.setRoot(MuralPage);
        console.log(res);
      }
      else {
        this.presentToast("Erro na criação do usuário: " + res.email);
      }
    }, erro => {
      this.presentToast("Erro na criação do usuário: " + erro.message);
      console.log("Erro: " + erro.message);
    });
  }
}

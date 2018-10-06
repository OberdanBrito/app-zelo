import { IUsuario } from './../../interfaces/IUsuario';
import { IProblema } from './../../interfaces/IProblema';
import { UtilsComponent } from './../../components/utils/utils';
import { ProblemaProvider } from './../../providers/problema/problema';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the AcaoProblemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acao-problema',
  templateUrl: 'acao-problema.html',
  template: `
  <ion-list>
    <ion-list-header>

      <button ion-button outline color="dark" (click)="close()">X</button>
      &nbsp;&nbsp;&nbsp;Atualizar Problema
    </ion-list-header>
    <button *ngIf="action.aceitar" ion-item (click)="setStatus('aceito')">
        Aceitar
    </button>
    <button *ngIf="action.rejeitar" ion-item (click)="setStatus('rejeitado')">
        Rejeitar
    </button>
    <button *ngIf="action.resolvido" ion-item (click)="setStatus('resolvido')">
        Resolvido
    </button>
    <button *ngIf="action.encerrar" ion-item (click)="setStatus('encerrado')">
        Encerrar
    </button>
    <button *ngIf="action.cancelar" ion-item (click)="setStatus('cancelado')">
        Cancelar
    </button>
  </ion-list>
`
})
export class AcaoProblemaPage extends UtilsComponent {

  action = {
    aceitar:false,
    rejeitar:false,
    resolvido:false,
    encerrar:false,
    cancelar:false
  };

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
    foto: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public provProblema:ProblemaProvider,
    public toastCtrl: ToastController,
    public provUsuario:UsuariosProvider
    ) {
      super(toastCtrl);
      this.problema = this.navParams.get('problema');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcaoProblemaPage');
    this.setupActionBar();
  }

  close() {
    this.viewCtrl.dismiss();
  }
  setStatus(acao:string) {
    this.problema.status = acao;
    this.provProblema.setStatusProblema(this.problema).subscribe(res => {
      console.log(res);
      this.close();
      this.presentToast('O status do problema foi alterado');
    }, erro => {
      console.log("Erro: " + erro.message);
      this.presentToast('Erro na atualização do status');
    });
  }
  
  setupActionBar() {
    this.provUsuario.getStorage("usuario").then(res => {
      this.usuario = res;
      console.log('this.usuario.name: '+this.usuario.name);
    
      let perfil:string = localStorage.getItem("perfil");

      console.log("this.problema.status: "+this.problema.status);
      console.log("perfil: "+perfil);
      
      console.log("this.problema.user_id: "+this.problema.user_id);

      if (this.usuario.id == this.problema.user_id) {

        if (this.problema.status == "aberto" && perfil == 'adm') {
          this.action = {
            aceitar:true,
            rejeitar:false,
            resolvido:true,
            encerrar:false,
            cancelar:false
          };
        } else if (this.problema.status == "aberto" && perfil == 'morador') {
          this.action = {
            aceitar:false,
            rejeitar:false,
            resolvido:false,
            encerrar:true,
            cancelar:true
          };
        } else if (this.problema.status == "aceito" && perfil == 'adm') {
            this.action = {
              aceitar:false,
              rejeitar:false,
              resolvido:true,
              encerrar:false,
              cancelar:false
            };
        } else if (this.problema.status == "aceito" && perfil == 'morador') {
          this.action = {
            aceitar:false,
            rejeitar:false,
            resolvido:false,
            encerrar:true,
            cancelar:true
          };
        } else if (this.problema.status == "rejeitado" && perfil == 'adm') {
          this.action = {
            aceitar:true,
            rejeitar:false,
            resolvido:true,
            encerrar:false,
            cancelar:false
          };
        } else if (this.problema.status == "rejeitado" && perfil == 'morador') {
          this.action = {
            aceitar:false,
            rejeitar:false,
            resolvido:false,
            encerrar:true,
            cancelar:true
          };
        } else if (this.problema.status == "resolvido" && perfil == 'adm') {
          this.action = {
            aceitar:false,
            rejeitar:false,
            resolvido:false,
            encerrar:false,
            cancelar:false
          };
        } else if (this.problema.status == "resolvido" && perfil == 'morador') {
          this.action = {
            aceitar:false,
            rejeitar:true,
            resolvido:false,
            encerrar:true,
            cancelar:true
          };
        } else {
          this.action = {
            aceitar:false,
            rejeitar:false,
            resolvido:false,
            encerrar:false,
            cancelar:false
          };
        }
      } else {

        this.action = {
          aceitar:false,
          rejeitar:false,
          resolvido:false,
          encerrar:false,
          cancelar:false
        };

      }
    });
  }

}

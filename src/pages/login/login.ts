import { SorteioPage } from './../sorteio/sorteio';
import { UnidadesPage } from './../unidades/unidades';
import { MuralPage } from './../mural/mural';
import { UtilsComponent } from './../../components/utils/utils';
import { CadastroPage } from "./../cadastro/cadastro";
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { IUsuario } from './../../interfaces/IUsuario';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends UtilsComponent {

  usuario:IUsuario = {email:'', 
                      name:'', 
                      password:'', 
                      password_confirmation:'',
                      condominio_id:null, 
                      torre_id:null,
                      unidade:null,
                      foto:''
                    };
  usrPerfil = {perfil:''};
  constructor(
    public navCtrl:NavController, 
    public usuariosProvider:UsuariosProvider,
    public menuCtrl:MenuController,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController
  ) { 
    super(toastCtrl); 
  }
  ionViewDidEnter(){
    this.usuariosProvider.setStorage("usuario",null);
    this.usuariosProvider.setStorage("unidade",null);
    localStorage.setItem("token",null);
  }
  ativaMenuLogin() {
    this.menuCtrl.enable(true, 'usuarioComLogin');
    this.menuCtrl.enable(false, 'usuarioSemLogin');
  }

  loginUsuario(){
    let load = this.loadingCtrl.create({
      content:'Aguarde...',
      duration: 14000
    });
    load.present();
    this.usuariosProvider.loginUsuario(this.usuario).subscribe(res => {
      load.dismiss();
      if (res.token != null) {
        this.usuariosProvider.setStorage("usuario",res);
        localStorage.setItem("token",res.token);

        this.usuariosProvider.getPerfil().subscribe(res => {
          this.usrPerfil = res;
          console.log('usrPerfil: '+this.usrPerfil.perfil);
          localStorage.setItem('perfil',this.usrPerfil.perfil);
        }, erro => {
          console.log("Erro: " + erro.message);    
        });          

        // Recupera todas as unidades do usuário
        this.usuariosProvider.getUnidadesUsuario().subscribe(unid => {
          if (unid.length == 1) {
            this.usuariosProvider.setStorage("unidade",unid[0]);
            // this.navCtrl.setRoot(MuralPage, {unidade: unid[0]}); // SOSORTEIO - Comentado para que o app abra direto a página de sorteios
            this.navCtrl.setRoot(SorteioPage);
          } else {
            console.log("unid: "+unid);
            this.navCtrl.push(UnidadesPage, {unidades: unid});
          }
        }, erro => {
          console.log("Erro: " + erro.message);    
        });          

        this.presentToast("Olá, "+res.name+"! Seja bem vindo(a) :)");
        //this.ativaMenuLogin();
        console.log(res);
      } else {
        this.presentToast("Erro na autenticação: "+res.email);
      }  
    }, erro => {
      load.dismiss();
      this.presentToast("Erro na autenticação do usuário! :(");
      console.log("Erro: " + erro.message);
    });
    

    
  }

  goCadastro() {
    this.navCtrl.push(CadastroPage);
  }

}

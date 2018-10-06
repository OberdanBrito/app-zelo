import { MuralPage } from './../mural/mural';
import { UtilsComponent } from './../../components/utils/utils';
import { CadastroPage } from "./../cadastro/cadastro";
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { IUsuario } from './../../interfaces/IUsuario';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
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
    public navCtrl: NavController, 
    public usuariosProvider:UsuariosProvider,
    public menuCtrl:MenuController,
    public toastCtrl:ToastController
  ) { 
    super(toastCtrl); 
  }
  ionViewDidEnter(){
    this.usuariosProvider.setStorage("usuario",null);
    localStorage.setItem("token",null);
  }
  ativaMenuLogin() {
    this.menuCtrl.enable(true, 'usuarioComLogin');
    this.menuCtrl.enable(false, 'usuarioSemLogin');
  }

  loginUsuario(){
    this.usuariosProvider.loginUsuario(this.usuario).subscribe(res => {
      if (res) {
        this.usuariosProvider.setStorage("usuario",res);
        localStorage.setItem("token",res.token);

        this.usuariosProvider.getPerfil().subscribe(res => {
          this.usrPerfil = res;
          console.log('usrPerfil: '+this.usrPerfil.perfil);
          localStorage.setItem('perfil',this.usrPerfil.perfil);
        }, erro => {
          console.log("Erro: " + erro.message);    
        });          

        this.presentToast("Olá, "+res.name+"! Seja bem vindo(a) :)");
        //this.ativaMenuLogin();
        this.navCtrl.setRoot(MuralPage);
        console.log(res);
      } else {
        alert("usuario ou senha inválidos!");
      }  
    }, erro => {
      this.presentToast("Erro na autenticação do usuário! :(");
      console.log("Erro: " + erro.message);
    });

    
  }

  goCadastro() {
    this.navCtrl.push(CadastroPage);
  }

}

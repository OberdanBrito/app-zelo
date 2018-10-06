import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { UtilsComponent } from './../../components/utils/utils';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { IUsuario } from './../../interfaces/IUsuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage extends UtilsComponent{

  usuario:IUsuario = {email:'', 
                      name:'', 
                      password:'', 
                      password_confirmation:'',
                      condominio_id:null, 
                      torre_id:null,
                      unidade:null,
                      foto:''
                    };
  novaSenha = {newPassword:'', newPassword_confirmation:''};
  escondeSenha:Boolean = true;
  icoBotaoSenha:string = "arrow-dropdown";
  caminho:string = "http://192.168.0.7:8000/storage/";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuariosProvider:UsuariosProvider,
    public toastCtrl:ToastController,
    public camera: Camera, 
    public actionSheetCtrl: ActionSheetController, 
    public photoViewer: PhotoViewer
  ) {
    super(toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.usuariosProvider.getStorage("usuario").then(res => {
      this.usuario = res;
    });
  }

  editUsuario() {
    if (this.novaSenha.newPassword == this.novaSenha.newPassword_confirmation) {
      this.usuariosProvider.editUsuario(this.usuario,this.novaSenha).subscribe(res => {
        this.usuariosProvider.setStorage("usuario",res);
        this.presentToast("Usuário atualizado :)");
        this.navCtrl.pop();
      }, erro => {
        this.presentToast("Erro na atualização do usuário: "+ erro.message);
        console.log("Erro: " + erro.message);
      });
    } else {
      this.presentToast("O campo de Confirmação é diferente da Nova Senha");
    }
  }

  alterarSenha() {

    this.escondeSenha = !this.escondeSenha;
    if (this.icoBotaoSenha == "arrow-dropdown") {
      this.icoBotaoSenha = "arrow-dropup";
    } else {
      this.icoBotaoSenha = "arrow-dropdown";  
    }
    this.usuario.password = null;
    this.novaSenha = {newPassword:'', newPassword_confirmation:''};
  }

  onActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a fonte da imagem',
      buttons: [
        {
          text: 'Galeria',
          role: 'destructive',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  takePicture(sourceType: number){
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType
    };
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.usuario.foto = base64Image;
     this.caminho = null;
    }, (err) => {
      console.log("Erro: "+err);
    });
  }

  showImage(myImage) {
    this.photoViewer.show(myImage);
  }

}

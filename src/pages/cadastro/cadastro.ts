import { SelectCondominioPage } from './../select-condominio/select-condominio';
import { UtilsComponent } from './../../components/utils/utils';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IUsuario } from './../../interfaces/IUsuario';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage extends UtilsComponent {
  @ViewChild('senha') campoSenha ;

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

  msgName:boolean = false;
  msgEmail:boolean = false;
  msgPassword:boolean = false;
  msgPassConf:boolean = false;
  msgPassMenor:boolean = false;
  msgPassDiferente: boolean = false;;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public usuariosProvider: UsuariosProvider, 
    public camera: Camera, 
    public actionSheetCtrl: ActionSheetController, 
    public photoViewer: PhotoViewer, 
    public toastCtrl: ToastController
  ) {
    super(toastCtrl);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  goSelectCondominio() {

    this.msgName = false;
    this.msgEmail = false;
    this.msgPassword = false;
    this.msgPassConf = false;

    if (this.usuario.name == '') { 
      this.msgName = true;
    } 
    else if (this.usuario.email == '') {
      this.msgEmail = true;
    } 
    else if (this.usuario.password == '') {
      this.msgPassword = true; 
    } 
    else if (this.usuario.password_confirmation == '') {
      this.msgPassConf = true; 
    } 
    else if (this.usuario.password != this.usuario.password_confirmation) {
      this.msgPassDiferente = true; 
    } 
    else {    
    this.navCtrl.push(SelectCondominioPage, {pUsuario:this.usuario});
    }
  }
  
  chkSenha() {
    if (this.usuario.password.length < 6 ) {
      this.msgPassMenor = true;
      this.campoSenha.setFocus();
    } else {
      this.msgPassMenor = false;
    }
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
    }, (err) => {
      console.log("Erro: "+err);
    });
  }

  showImage(myImage) {
    this.photoViewer.show(myImage);
  }

}

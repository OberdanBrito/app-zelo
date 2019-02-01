import { ProblemaProvider } from './../../providers/problema/problema';
import { IProblema } from './../../interfaces/IProblema';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the CriarProblemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-problema',
  templateUrl: 'criar-problema.html',
})
export class CriarProblemaPage {

  problema:IProblema = {titulo:"",
  fone:"",
  descricao:"",
  local_id:null,
  tipo_id:null,
  status:"aberto",
  data:null,
  fotos:['']};
  
  fotos = [];
  listaLocais = [];
  listaTipos = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera:Camera,
              public actionSheetCtrl:ActionSheetController, 
              private photoViewer: PhotoViewer,
              public problemaProvider:ProblemaProvider,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CriarProblemaPage');
    this.allLocais();
  }

  clsProblema(){
    this.problema = {
    titulo:"",
    fone:"",
    descricao:"",
    local_id:null,
    tipo_id:null,
    status:"aberto",
    data:null,
    fotos:['']
  };
    this.fotos = null;
  }

  addProblema() {
    let load = this.loadingCtrl.create({
      content:'Aguarde...',
      duration: 14000
    });
    load.present();
    if (this.fotos) {
      this.problema.fotos = this.fotos;
    }
    this.problemaProvider.addProblema(this.problema).subscribe(res => {
      
      console.log(res);
      load.dismiss();
      this.presentToast("O seu problema foi registrado!");
      this.navCtrl.pop();

    }, erro => {
      console.log("Erro: " + erro.message);
      load.dismiss();
      this.presentToast("Erro no registro do problema!");
    });

  }

  allLocais() {

    this.problemaProvider.allLocais().subscribe(res => {
      this.listaLocais = res;
    }, erro => {
      console.log("Erro: " + erro.message);
    });

  }
  
  getTipos(local_id:number) {

    this.problemaProvider.getTipos(local_id).subscribe(res => {
      this.listaTipos = res;
      this.problema.tipo_id = null;
    }, erro => {
      console.log("Erro: " + erro.message);
    });

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
     this.fotos.push(base64Image);
    }, (err) => {
      console.log("Erro: "+err);
    });
  }

  showImage(myImage) {
    this.photoViewer.show(myImage);
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

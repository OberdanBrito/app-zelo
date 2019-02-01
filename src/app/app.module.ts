import { ResultadoSorteioPage } from './../pages/resultado-sorteio/resultado-sorteio';
import { DetalheListaPage } from './../pages/detalhe-lista/detalhe-lista';
import { OutrasListasPage } from './../pages/outras-listas/outras-listas';
import { SorteioPage } from './../pages/sorteio/sorteio';
import { SelVagasPage } from './../pages/sel-vagas/sel-vagas';
import { AcaoProblemaPage } from './../pages/acao-problema/acao-problema';
import { MuralPage } from './../pages/mural/mural';
import { CadastroPage } from "./../pages/cadastro/cadastro";
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { MeusProblemasPage } from '../pages/meus-problemas/meus-problemas';
import { DetalheProblemaPage } from '../pages/detalhe-problema/detalhe-problema';
import { CriarProblemaPage } from '../pages/criar-problema/criar-problema';
import { LoginPage } from './../pages/login/login';
import { PerfilPage } from './../pages/perfil/perfil';
import { ListPage } from '../pages/list/list'; //Excluir

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicStorageModule } from '@ionic/storage';
import { DragulaModule } from 'ng2-dragula';

import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { ProblemaProvider } from '../providers/problema/problema';
import { CondominioProvider } from '../providers/condominio/condominio';
import { SelectCondominioPage } from '../pages/select-condominio/select-condominio';
import { UnidadesPage } from '../pages/unidades/unidades';
import { SorteioProvider } from '../providers/sorteio/sorteio';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MeusProblemasPage,
    ListPage,
    DetalheProblemaPage,
    CriarProblemaPage,
    PerfilPage,
    CadastroPage,
    MuralPage,
    AcaoProblemaPage,
    SelectCondominioPage,
    SorteioPage,
    SelVagasPage,
    UnidadesPage,
    OutrasListasPage,
    DetalheListaPage,
    ResultadoSorteioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    DragulaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MeusProblemasPage,
    ListPage,
    DetalheProblemaPage,
    CriarProblemaPage,
    PerfilPage,
    CadastroPage,
    MuralPage,
    AcaoProblemaPage,
    SelectCondominioPage,
    SorteioPage,
    SelVagasPage,
    UnidadesPage,
    OutrasListasPage,
    DetalheListaPage,
    ResultadoSorteioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    PhotoViewer,
    UsuariosProvider,
    ProblemaProvider,
    CondominioProvider,
    SorteioProvider
  ]
})
export class AppModule {}

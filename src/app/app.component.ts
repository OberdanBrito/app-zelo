import { MuralPage } from './../pages/mural/mural';
import { PerfilPage } from './../pages/perfil/perfil';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MeusProblemasPage } from '../pages/meus-problemas/meus-problemas';
import { CriarProblemaPage } from '../pages/criar-problema/criar-problema';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Perfil', component: PerfilPage },
      { title: 'Mural de Problemas', component: MuralPage },
      { title: 'Meus Problemas', component: MeusProblemasPage },
      { title: 'Criar Problema', component: CriarProblemaPage },      
      { title: 'Sair', component: LoginPage }
    ];

    localStorage.setItem("defaultURL","http://192.168.0.7:8000/api/");
    //localStorage.setItem("defaultURL","https://zelo.herokuapp.com/api/");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Sair' || page.title == 'Mural de Problemas') {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }
}

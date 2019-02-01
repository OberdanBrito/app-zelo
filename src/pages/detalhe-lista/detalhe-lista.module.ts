import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheListaPage } from './detalhe-lista';

@NgModule({
  declarations: [
    DetalheListaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheListaPage),
  ],
})
export class DetalheListaPageModule {}

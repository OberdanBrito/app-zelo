import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheProblemaPage } from './detalhe-problema';

@NgModule({
  declarations: [
    DetalheProblemaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheProblemaPage),
  ],
})
export class DetalheProblemaPageModule {}

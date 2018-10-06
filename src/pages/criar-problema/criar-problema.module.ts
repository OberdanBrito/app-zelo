import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarProblemaPage } from './criar-problema';

@NgModule({
  declarations: [
    CriarProblemaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarProblemaPage),
  ],
})
export class CriarProblemaPageModule {}

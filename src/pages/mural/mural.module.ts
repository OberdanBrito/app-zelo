import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuralPage } from './mural';

@NgModule({
  declarations: [
    MuralPage,
  ],
  imports: [
    IonicPageModule.forChild(MuralPage),
  ],
})
export class MuralPageModule {}

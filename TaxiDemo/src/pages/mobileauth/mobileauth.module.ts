import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileAuthPage } from './mobileauth';

@NgModule({
  declarations: [
    MobileAuthPage
  ],
  imports: [
    IonicPageModule.forChild(MobileAuthPage),
  ],
})
export class MobileauthPageModule {}

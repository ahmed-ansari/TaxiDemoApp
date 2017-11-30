import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicledetailsPage } from './vehicledetails';

@NgModule({
  declarations: [
    VehicledetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicledetailsPage),
  ],
})
export class VehicledetailsPageModule {}

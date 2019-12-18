import { NgModule } from '@angular/core';
import {MatToolbarModule,MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule} from '@angular/material';

@NgModule({
  exports: [ MatToolbarModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule]
})

export class MaterialModule { }

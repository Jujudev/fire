import { NgModule } from '@angular/core';
import {MatToolbarModule,MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';

@NgModule({
  exports: [ MatToolbarModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})

export class MaterialModule { }

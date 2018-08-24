import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
      TranslateModule,
  ],
  declarations: [
      DashboardComponent,
  ]
})
export class ComponentsModule { }

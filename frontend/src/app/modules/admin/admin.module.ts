import { NgModule } from '@angular/core';
import { routing } from "@modules/admin/admin.routing";
import { AdminLayoutModule } from "@modules/admin/layout/admin-layout.module";

@NgModule({
  declarations: [
  ],
  imports: [
    routing,
    AdminLayoutModule
  ]
})
export class AdminModule { }

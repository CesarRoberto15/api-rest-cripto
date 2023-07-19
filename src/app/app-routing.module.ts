import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './table/table/table.component';

const routes: Routes = [{
  path: '',
  component: TableComponent
  //data: {title: "menu"},
  //loadChildren:async () => await import("./table/table.module").then(c => c.TableModule)  //llamando TableModule
}
/*{
  path: "",
  component: PruebaComponent
}*/];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

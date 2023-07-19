import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { CriptoService } from './cripto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableRoutingModule } from './table-routing.module';



@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    TableRoutingModule,
    FormsModule
  ],
  providers: [
    CriptoService
  ]
})
export class TableModule { }

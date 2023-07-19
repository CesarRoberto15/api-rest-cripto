import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { CriptoService } from '../cripto.service';
import { Cripto } from './Cripto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

//const MONEDA: Cripto[] = [];

function search (moneda:Cripto[], text: string): Cripto[] {
  return moneda.filter(dato => {
    const term = text.toLowerCase();
    return dato.name.toLowerCase().includes(term); 
  });
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  optionModal = { title: '', action: ''}
  fromMasterGroup :FormGroup = new FormGroup({});
  nameButton = '';
  titleModal = '';
  subTitleModal = '';

  listaCripto:any = [];
  moneda:Cripto[] = [];
  filtroMoneda!: Cripto[];
  names: string[] = ['Pepe','Carlos','Jose','Maria','Laura','Roberto','Cesar','Gelber','Penta','Giovanni'];
  page = 1;
  pageSize = 3;
  collectionSize = 10;
  contador = 0;
  //globalURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  globalURL = 'https://api.thecatapi.com/v1/images/search?limit=10';

  filter = new FormControl('');
  moneda$: Observable<Cripto[]> | undefined;

  constructor(private CriptoServise:CriptoService, private modalService: NgbModal) { 
    this.moneda$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(this.moneda,text))
    );
    this.fromMasterGroup = this.createForm();
    this.cargaData();
    
  }
  ngOnInit(): void { }

  get id(){
    return this.fromMasterGroup.get('id');
  }

  get name(){
    return this.fromMasterGroup.get('name');
  }

  get image(){
    return this.fromMasterGroup.get('image');
  }

  createForm = () => new FormGroup ({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required])
  });

  cargaData(){
    this.CriptoServise.get(this.globalURL).subscribe(data => {
      this.listaCripto = data;
      

      console.log(data);
      
      for(let item of this.listaCripto){
        this.moneda.push({
          id: item.id,
          name: this.names[this.contador],
          image: item.url,
        })
        this.contador++
      }
      this.contador=0;
      console.log('monedas ',this.moneda);
      // this.moneda = this.moneda
      // .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
    })
  }

  accionBoton(modal:any){
    if(this.optionModal.action=='create') {
      // this.moneda.push({
      //    id: 'pero',
      //    name: "david",
      //    image: "https://img.freepik.com/foto-gratis/perrito-joven-posando-alegre_155003-28765.jpg"
      // });
      this.moneda.push(this.fromMasterGroup.value);
      //console.log(this.fromMasterGroup.value.id)
      modal.close();
    }
    if (this.optionModal.action=="edit") {
      // this.moneda.push(this.fromMasterGroup.value);
      this.moneda.map((dato) =>{
        if(dato.id==this.fromMasterGroup.value.id){
          dato.name=this.fromMasterGroup.value.name;
          dato.image=this.fromMasterGroup.value.image;
        }
      });
      modal.close();
    }
    
  }
  deleteItem(content: any, item:Cripto){
    // this.moneda.map((dato) =>{
    //   if(dato.id==item){
    //     this.delete(this.moneda.indexOf(item));
    //   }
    // });
    this.moneda = this.moneda.filter((dato)=>dato!==item);
  }


  //MODAL--------------------------------------------------------

  open(content: any) {
    this.fromMasterGroup.reset()
    this.nameButton = 'Agregar';
    const createModal = {title: 'Agregar', action: 'create'};
    this.optionModal = createModal;
    this.subTitleModal = "Agregar";
    this.modalService.open(content)
  }

  openE(content: any, item:Cripto) {
    this.fromMasterGroup.reset()
    this.nameButton = 'Actualizar';
    const createModal = {title: 'Editar', action: 'edit'};
    this.optionModal = createModal;
    this.subTitleModal = "Editar";
    this.modalService.open(content);

    //console.log('mascota: ',item);

    
    
    //this.fromMasterGroup.controls.id.setValue(item.id); //para acceder y mostrar cada uno de los datos
    this.fromMasterGroup.patchValue(item) //si todo tiene la misma estructura
    //  this.fromMasterGroup.value.name = item.name;
    //  this.fromMasterGroup.value.image = item.image;

  }

  
















  /*private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }*/

  //--------------------------------------------------------------------

  /*search(text: string, pipe: PipeTransform): Cripto[] {
    return this.moneda.filter(cripto => {
      const term = text.toLowerCase();
      return cripto.name.toLowerCase().includes(term)
          || pipe.transform(cripto.id).includes(term)
    });
  }*/

  /*refreshCountries() {
    this.moneda = this.moneda
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }*/

  

}


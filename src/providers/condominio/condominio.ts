import { IListaVaga } from './../../interfaces/IListaVaga';
import { IVaga } from './../../interfaces/IVaga';
import { IUnidade } from './../../interfaces/IUnidade';
import { ITorre } from './../../interfaces/ITorre';
import { ICondominio } from './../../interfaces/ICondominio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CondominioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CondominioProvider {

  url:string = localStorage.getItem("defaultURL");
  token:string = localStorage.getItem("token");

  constructor(public http: HttpClient) {
    console.log('Hello CondominioProvider Provider');
  }

  allCondominios(){
    return this.http.get<ICondominio[]>(this.url +'condominios');
  }

  getTorres(idCondominio:number){
    return this.http.get<ITorre[]>(this.url +'torres/?condominio_id='+idCondominio);
  }

  getUnidades(idCondominio:number, idTorre:number){
    return this.http.get<IUnidade[]>(this.url +'unidades/?condominio_id='+idCondominio+'&torre_id='+idTorre,{"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  allVagasGaragem(unidade:IUnidade){
    return this.http.get<IVaga[]>(this.url +'vagasGaragem/?condominio_id='+unidade.condominio_id+'&torre_id='+unidade.torre_id,{"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }
  
  addListaVagas(selecaoVagas:IListaVaga[]){
    return this.http.post<IListaVaga>(this.url +'listaVagas/add',selecaoVagas,{"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  delListaVagas(dadosSorteio){
    return this.http.post<any>(this.url +'listaVagas/del',dadosSorteio,{"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  getListaVagas(unidade:IUnidade, dataSorteio:Date) {
    return this.http.get<IVaga[]>(this.url +'listaVagas/?unidade_id='+unidade.id+"&dataSorteio="+dataSorteio.toDateString(),{"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

}

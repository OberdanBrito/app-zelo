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

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SorteioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SorteioProvider {

  url:string = localStorage.getItem("defaultURL");
  token:string = localStorage.getItem("token");

  constructor(public http: HttpClient) {
    console.log('Hello SorteioProvider Provider');
  }

  getResultadoSorteio(idCondominio:number){
    return this.http.get<any>(this.url +'resultadoSorteio/?condominio_id='+idCondominio, {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

}

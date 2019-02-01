import { IUnidade } from './../../interfaces/IUnidade';
import { IProblema } from './../../interfaces/IProblema';
import { IUsuario } from './../../interfaces/IUsuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITipo } from './../../interfaces/ITipo';
import { ILocal } from './../../interfaces/ILocal';

/*
  Generated class for the ProblemaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProblemaProvider {

  url:string = localStorage.getItem("defaultURL");
  headers:any;

  constructor(public http: HttpClient) {
    console.log('Hello ProblemaProvider Provider');
  }

  allLocais(){
    return this.http.get<ILocal[]>(this.url +'locais', {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  getTipos(local_id:number){
    return this.http.get<ITipo[]>(this.url +'tipos/?local_id='+local_id, {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  getProblemasMorador() {
    return this.http.get<IProblema[]>(this.url +'problemas', {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  getMoradorProblema(problema:IProblema) {
    return this.http.post<IUsuario>(this.url +'moradorProblema', problema, {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }
  
  getProblemasCondominio(unidade:IUnidade) {
    return this.http.get<IProblema[]>(this.url +'problemascondominio/?condominio_id='+unidade.condominio_id, {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  getFotosProblemas(problema:IProblema) {
    return this.http.get<string[]>(this.url +'fotosProblema/?problema_id='+problema.id, {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  addProblema(problema:IProblema){
    return this.http.post<IProblema>(this.url +'problema/add', problema, {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }

  setStatusProblema(problema:IProblema){
    return this.http.post<IProblema>(this.url +'problema/setStatus', problema, {"headers": {"authorization": "Bearer "+localStorage.getItem("token"), "accept":"application/json"}});
  }
}

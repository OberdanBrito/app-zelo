import { IUsuario } from '../../interfaces/IUsuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IUnidade } from '../../interfaces/IUnidade';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  url:string = localStorage.getItem("defaultURL");
  headers:any;
  token:string = localStorage.getItem("token");

  constructor(
    public http: HttpClient,
    private storage: Storage
  ) 
  {
    this.headers = {"headers": {"authorization": "Bearer "}};

  }

  setStorage(chave,valor){
    this.storage.set(chave, valor);
  }

  getStorage(chave){
    return this.storage.get(chave);
  }

  showUsuario(usuario:IUsuario){
    return this.http.get<IUsuario>(this.url +'usuario',{"headers": {"authorization": "Bearer "+usuario.token}});
  }

  loginUsuario(data:IUsuario){
    return this.http.post<IUsuario>(this.url +'login',data);
  }

  addUsuario(data:IUsuario){
    
    return this.http.post<IUsuario>(this.url +'cadastro',data);
  }

  editUsuario(data:IUsuario, _novaSenha){
    let auxUsuario = {"email":data.email,
                      "id":data.id,
                      "name":data.name,
                      "password":data.password,
                      "newPassword":_novaSenha.newPassword,
                      "foto":data.foto};
                      
    this.token = localStorage.getItem("token");
    return this.http.post<IUsuario>(this.url +'editusuario',auxUsuario,{"headers": {"authorization": "Bearer "+this.token, "accept":"application/json"}});
  }

  getPerfil(){
    this.token = localStorage.getItem("token");
    return this.http.get<any>(this.url +'perfil',{"headers": {"authorization": "Bearer "+this.token}});
  }

  getUnidadesUsuario(){
    this.token = localStorage.getItem("token");
    return this.http.get<IUnidade[]>(this.url +'unidadesUsuario',{"headers": {"authorization": "Bearer "+this.token}});
  }

}

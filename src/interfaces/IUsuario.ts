export interface IUsuario{
    id?: number;
    name?:string;
    email:string;
    password?:string;
    password_confirmation?:string;
    token?:string;
    sexo?:string;
    nascimento?:Date;
    condominio_id?: number;
    torre_id?: number;
    unidade?: number;
    foto?: string;
    validador?:string;
}
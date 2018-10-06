export interface ICondominio{
    id?: number;
    nome:string;
    tipo:string; //residencial, comercial, misto
    plano_id:number;
    sindico_user_id?:number;
    zelador_user_id?:number;
}
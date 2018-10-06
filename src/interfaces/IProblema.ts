export interface IProblema{
    id?:number, 
    user_id?:number,
    local_id:number,
    tipo_id:number,
    titulo:string,
    fone:string,
    descricao:string,
    status:string,
    data?:Date,
    fotos?:string[]
}

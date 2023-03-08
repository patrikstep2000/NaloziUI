import MaterialTypeType from "./MaterialType"

type MaterialType={
    id:number,
    name:string,
    type:Partial<MaterialTypeType>
}

export default MaterialType;
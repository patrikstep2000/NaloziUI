import MaterialType from "../Material/Material"

type OrderMaterialType={
    id:number,
    details:string,
    amount:number,
    material:Partial<MaterialType>
}

export const OrderMaterialHeader = [
    { name: "material", label: "Materijal", disablePadding: false, numeric: false,
        formatter: (e:Partial<MaterialType>) => {
            if(e) return `${e.name} (${e.type?.name})`;
        }
    },
    { name: "amount", label: "Količina", disablePadding: false, numeric: false },
    { name: "details", label: "Napomena", disablePadding: false, numeric: false }
]

export default OrderMaterialType;
import PrinterBrandType from "./PrinterBrand";
import PrinterTypeType from "./PrinterType";

type PrinterModelType={
    id:number,
    name:string,
    type:PrinterTypeType,
    printer_brand:PrinterBrandType
}

export default PrinterModelType;
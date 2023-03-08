import CounterType from "../Counter";
import OrderMaterialType from "../Material/OrderMaterial";
import PrinterType from "../Printer/Printer";
import PrinterModelType from "./PrinterModel";

type OrderPrinterType={
    id?:number,
    printer:Partial<PrinterType>,
    counter?:Partial<CounterType>,
    material?:Partial<OrderMaterialType>[]
}

export const OrderPrinterHeader = [
    { name: "printer", label: "Printer", disablePadding: false, numeric: false,
        formatter: (e:{model:Partial<PrinterModelType>, serial_number:string}) => {
            return e ? `${e.model.printer_brand?.name} ${e.model.name} (${e.serial_number})` : '';
        }
    }
]

export default OrderPrinterType;
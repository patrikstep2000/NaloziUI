import CounterType from "../Counter";
import OrderMaterialType from "../Material/OrderMaterial";
import UnregisteredPrinterType from "../Printer/UnregisteredPrinter";

type OrderUnregisteredPrinterType={
    id?:number,
    printer:Partial<UnregisteredPrinterType>,
    counter:Partial<CounterType>,
    material:Partial<OrderMaterialType>[]
}

export const OrderUnregisteredPrinterHeader = [
    { name: "printer", label: "Printer", disablePadding: false, numeric: false,
        formatter: (e:{model:string, serial_number:string}) => {
            return e ? `${e.model} (${e.serial_number})` : '';
        }
    }
]

export default OrderUnregisteredPrinterType;
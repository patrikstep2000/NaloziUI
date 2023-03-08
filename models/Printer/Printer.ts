import ClientType from "../Client/Client";
import CounterType from "../Counter";
import PrinterModelType from "./PrinterModel";
import PrinterStatusType from "./PrinterStatus";

type PrinterType={
    id:number,
    serial_number:string,
    details:string,
    model:Partial<PrinterModelType>,
    status:Partial<PrinterStatusType>,
    client:Partial<ClientType>,
    all_counters?:CounterType[],
    deleted:boolean
}

export const PrinterHeader = [
    { name: "model", label: "Model", disablePadding: false, numeric: false, formatter: (e:PrinterModelType) => `${e.printer_brand.name} ${e.name}` },
    { name: "serial_number", label: "Serijski broj", disablePadding: false, numeric: false }
]

export default PrinterType;
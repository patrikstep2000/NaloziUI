import PrinterType from "./Printer/Printer";
import UnregisteredPrinterType from "./Printer/UnregisteredPrinter";

type CounterType={
    id:number,
    created_at:Date,
    bw_prints:number,
    color_prints:number,
    scans:number,
    printer?:PrinterType,
    unregistered_printer?:UnregisteredPrinterType
}

export default CounterType;
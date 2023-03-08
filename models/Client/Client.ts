import ContactType from "../Client/Contact";
import PrinterType from "../Printer/Printer";

export type Point={
    x:number,
    y:number
}

type ClientType={
    id:number,
    name:string,
    oib:string,
    erp:number,
    address:string,
    post_code:number,
    city:string,
    country:string,
    location?: Point,
    contacts?:Partial<ContactType>[],
    printers?:Partial<PrinterType>[]
}

export default ClientType;
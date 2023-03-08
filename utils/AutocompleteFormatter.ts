import ClientType from "../models/Client/Client";
import MaterialType from "../models/Material/Material";
import OrderPrinterType from "../models/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "../models/Printer/OrderUnregisteredPrinter";
import PrinterType from "../models/Printer/Printer";

export interface AutocompleteFormatter{
    format:(type:any) => string
}

export const ClientAutocompleteFormatter: AutocompleteFormatter = {
    format:(c:ClientType) => `${c.name} (${c.address}, ${c.post_code} ${c.city})`
} 

export const PrinterAutocompleteFormatter: AutocompleteFormatter = {
    format:(p:PrinterType) => `${p.model.printer_brand?.name} ${p.model.name} (${p.serial_number})`
}

export const MaterialAutocompleteFormatter: AutocompleteFormatter={
    format:(m:MaterialType) => `${m.name} (${m.type.name})`
}

export const OrderPrinterAutocompleteFormatter: AutocompleteFormatter={
    format:(p:OrderPrinterType) => `${p.printer.model?.printer_brand?.name} ${p.printer.model?.name} (${p.printer.serial_number})`
}

export const OrderUnregisteredPrinterAutocompleteFormatter: AutocompleteFormatter={
    format: (p: OrderUnregisteredPrinterType) => `${p.printer.model} (${p.printer.serial_number})`
}
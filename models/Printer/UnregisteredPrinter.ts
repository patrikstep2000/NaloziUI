type UnregisteredPrinterType = {
    id?:number,
    model:string,
    serial_number:string,
    details?:string
}

export const UnregisteredPrinterHeader=[
    { name: "model", label: "Printer", disablePadding: false, numeric: false },
    { name: "serial_number", label: "Serijski broj", disablePadding: false, numeric: false }
]

export default UnregisteredPrinterType;
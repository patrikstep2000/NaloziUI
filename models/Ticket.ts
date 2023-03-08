import ClientType from "./Client/Client";
import PrinterType from "./Printer/Printer";
import UserType from "./User/User";

type TicketType={
    id:number,
    details:string,
    created_at:Date,
    planned_solution_date?:Date,
    unregistered_client?:string,
    client?:Partial<ClientType>,
    unregistered_printers?:string[],
    printers?:Partial<PrinterType>[],
    user?:Partial<UserType>
}

export default TicketType;
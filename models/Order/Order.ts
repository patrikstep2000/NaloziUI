import { DateFormatter } from "../../utils/Formatters";
import ClientType from "../Client/Client";
import UnregisteredClientType from "../Client/UnregisteredClient";
import OrderMaterialType from "../Material/OrderMaterial";
import OrderPrinterType from "../Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "../Printer/OrderUnregisteredPrinter";
import UserType from "../User/User";
import OrderStatusType from "./OrderStatus";

type OrderType = {
  id?: number,
  order_number?: string,
  work_details?: string,
  created_at?: Date,
  closed_at?: Date,
  user: Partial<UserType>,
  client?:Partial<ClientType>,
  unregistered_client?: Partial<UnregisteredClientType>,
  status?: Partial<OrderStatusType>,
  material?:Partial<OrderMaterialType>[],
  printers?:Partial<OrderPrinterType>[],
  unregistered_printers?:Partial<OrderUnregisteredPrinterType>[],
  signed_name?: string
  signature?: string
};

export const OrderHeader = [
  { name: "order_number", label: "Order number", disablePadding: false, numeric: false },
  { name: "created_at", label: "Kreirano", disablePadding: false, numeric: false, formatter: (e:Date) => DateFormatter.formatToShortString(e) },
  { name: "closed_at", label: "Zatvoreno", disablePadding: false, numeric: false, formatter: (e:Date) => DateFormatter.formatToShortString(e) },
  { name: "client", label: "Klijent", disablePadding: false, numeric: false, formatter: (e:{name:String}) => e.name, 
  optional: (e:any)=> e["unregistered_client"].name},
  { name: "user", label: "Serviser", disablePadding: false, numeric: false, formatter: (e:{first_name: String, last_name: String}) => `${e.first_name} ${e.last_name}` },
  { name: "status", label: "Status", disablePadding: false, numeric: false, formatter: (e:{name:String}) => e.name }
]

export default OrderType;

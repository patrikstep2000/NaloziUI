import { DateTime } from "luxon"
import ClientType from "../models/Client/Client";
import UserType from "../models/User/User";

export class DateFormatter{
    public static formatToShortString = (date:Date | undefined) : string => {
        return date ? DateTime.fromISO(date.toString()).setLocale('HR').toLocaleString(DateTime.DATE_SHORT) : '-';
    }

    public static formatToLongString = (date:Date | undefined) : string => {
        return date ? DateTime.fromISO(date.toString()).setLocale('HR').toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS) : '-';
    }
}

export class UserFormatter{
    public static formatFullName = (user?:Partial<UserType>) => {
        return user ? `${user?.first_name} ${user?.last_name}` : '';
    } 
}

export class ClientFormatter{
    public static formatFullAddress = (client?:Partial<ClientType>) =>{
        return client ? `${client?.address}, ${client?.post_code} ${client?.city}, ${client?.country}` : '';
    } 
}
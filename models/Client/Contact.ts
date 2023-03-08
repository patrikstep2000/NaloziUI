import ClientType from "./Client"

type ContactType={
    id:number,
    full_name:string,
    phone?:string,
    email?:string,
    position?:string,
    responsible:boolean,
    client:ClientType
}

export default ContactType;
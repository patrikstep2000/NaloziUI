import { Point } from "./Client";

type UnregisteredClientType = {
    id?:number,
    name:string,
    location?:Point,
    address?:string
}

export default UnregisteredClientType;
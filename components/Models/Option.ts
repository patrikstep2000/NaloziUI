export type Option = {
    name:string,
    action:(e:any, additionValue:any)=>void
    formatter?:Function;
    field?:string;
    disabled?:Function;
}
export interface TableHeadCell{
    name:string;
    label:string;
    numeric:boolean;
    disablePadding:boolean;
    formatter?:Function;
    id?:number;
    optional?: Function;
}

export interface RowCell{
    name:string;
    value:string;
    formatter?:Function;
}

export interface RowCells{
    row:RowCell[]
}
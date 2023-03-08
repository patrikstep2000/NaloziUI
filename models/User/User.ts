import UserRoleType from "./UserRole";

type UserType={
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    role:UserRoleType,
    deleted_at?:Date
}

export default UserType;
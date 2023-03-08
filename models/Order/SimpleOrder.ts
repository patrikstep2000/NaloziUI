type SimpleOrderType={
    id:number,
    order_number: string,
    work_details: string,
    created_at: Date,
    closed_at?: Date,
    status_id:number,
    user_id:number,
    client_id:number
}

export default SimpleOrderType;
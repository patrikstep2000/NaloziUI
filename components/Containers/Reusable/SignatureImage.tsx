import { Paper, Stack } from "@mui/material";
import OrderType from "../../../models/Order/Order";

const SignatureImage: React.FC<{order:Partial<OrderType> | undefined}> = ({order}) => {
        return order?.signature && order?.signed_name ?
        (<Stack sx={{margin:"20px 0"}} spacing={1} direction="column">
            <div>Potpis klijenta:</div>
            <Paper 
                component="img" 
                sx={{width:"250px", height:"150px"}} 
                elevation={2}
                src={order.signature}
            ></Paper>
            <div>Ime i prezime: {order.signed_name}</div>
        </Stack>) : null
}

export default SignatureImage;
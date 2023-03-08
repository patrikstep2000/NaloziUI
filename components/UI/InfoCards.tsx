import ClientType from "../../models/Client/Client";
import OrderType from "../../models/Order/Order";
import {
  ClientFormatter,
  DateFormatter,
  UserFormatter,
} from "../../utils/Formatters";
import InfoCard from "../Containers/Reusable/InfoCard";
import SpaceBetweenTypography from "../Containers/Reusable/SpaceBetweenStack";

export const OrderInfocard: React.FC<{
  order: Partial<OrderType> | undefined;
}> = ({ order }) => {
  return (
    <InfoCard sx={{height:'fit-content'}}>
        <SpaceBetweenTypography leftSide="Broj naloga:" rightSide={order?.order_number}/>
        <SpaceBetweenTypography leftSide="Status:" rightSide={order?.status?.name}/>
        <SpaceBetweenTypography leftSide="Serviser:" rightSide={UserFormatter.formatFullName(order?.user)}/>
        <SpaceBetweenTypography leftSide="Datum:" rightSide={DateFormatter.formatToShortString(order?.created_at)}/>
    </InfoCard>
  );
};

export const ClientInfoCard: React.FC<{
  client: Partial<ClientType> | undefined;
}> = ({ client }) => {
  return (
    <InfoCard sx={{height:'fit-content'}}>
        <SpaceBetweenTypography leftSide="Klijent:" rightSide={client?.name}/>
        <SpaceBetweenTypography leftSide="Lokacija:" rightSide={ClientFormatter.formatFullAddress(client)}/>
    </InfoCard>
  );
};

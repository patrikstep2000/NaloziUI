import type { NextPage } from 'next';
import Main from '../../components/Containers/Main';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import OrderType from '../../models/Order/Order';
import { DBConnector } from '../../Connectors/MainDBConnector';
import {useRouter} from 'next/router';
import { ClientInfoCard, OrderInfocard } from '../../components/UI/InfoCards';
import { Stack } from '@mui/material';
import SimpleTable from '../../components/Containers/Reusable/SimpleTable';
import { OrderPrinterHeader } from '../../models/Printer/OrderPrinter';
import { OrderMaterialHeader } from '../../models/Material/OrderMaterial';
import { DateFormatter } from '../../utils/Formatters';
import SignatureImage from '../../components/Containers/Reusable/SignatureImage';
import { ApiUrls } from '../../components/Constants/URLs';


const Order: NextPage = () => {
  const [order, setOrder] = useState<OrderType>();
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if(id){
      DBConnector.get(`${ApiUrls.Order}/${id}`)
        .then(res => {
          setOrder(res.data);
        })
        .catch(console.error);
    }
  }, [id])

  return (
    <>
      <Head>
        <title>{`Nalog - ${order?.order_number ? order.order_number : ''}`}</title>
        <meta name="description" content="Nalog" />
        <link rel="icon" href={process.env.PAGE_ICON_URL} />
      </Head>

      <Main>
        <Stack spacing={2} direction="row" justifyContent="space-between" marginBottom={3}>
          <ClientInfoCard client={order?.client}/>
          <OrderInfocard order={order}/>     
        </Stack>
        <div>Opis radova:&nbsp; {order?.work_details}</div>
        <div>Početak radova:&nbsp;{DateFormatter.formatToLongString(order?.created_at)}</div>
        <div>Završetak radova:&nbsp;{DateFormatter.formatToLongString(order?.closed_at)}</div>
        <SignatureImage order={order}/>
      </Main>
    </>
  )
}

export default Order;
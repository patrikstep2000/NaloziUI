import type { NextPage } from "next";
import Main from "../../../components/Containers/Main";
import Head from "next/head";
import { useRouter } from "next/router";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { DBConnector } from "../../../Connectors/MainDBConnector";
import { ApiUrls } from "../../../components/Constants/URLs";
import OrderType from "../../../models/Order/Order";
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Stack } from "@mui/material";
import {
  ClientInfoCard,
  OrderInfocard,
} from "../../../components/UI/InfoCards";
import OrderTabs from "../../../components/UI/OrderTabs";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Signature from "../../../components/Containers/Reusable/Signature";
import ReactSignatureCanvas from "react-signature-canvas";

const EditOrder: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Partial<OrderType>>({});
  const [signatureVisible, setSignatureVisible] = useState(false);
  const signatureRef = useRef<ReactSignatureCanvas | null>(null);
  const [signatureURL, setSignatureURL] = useState<string>()

  useEffect(() => {
    if (id) {
      DBConnector.get(`${ApiUrls.Order}/${id}`)
        .then((result) => setOrder(result.data))
        .catch(console.error);
    }
  }, [id]);

  const saveOrder = () => {

  }

  const signOrder = () => {
      setSignatureVisible(true)
  } 

  const onSigned = () => {
    setSignatureURL(signatureRef.current?.getTrimmedCanvas().toDataURL())
    setOrder(prev => {
      return {
        ...prev,
        signature: signatureURL
      }
    })
  }

  const actions = [
    {icon: <SaveIcon/>, name: 'Spremi', action: saveOrder},
    {icon: <EditIcon/>, name: 'Potpiši', action: signOrder}
  ]

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Home page" />
        <link rel="icon" href={process.env.PAGE_ICON_URL} />
      </Head>

      <Main>
        <Signature visible={signatureVisible} setVisible={setSignatureVisible} signatureRef={signatureRef} onSigned={onSigned}/>
        <SpeedDial
          ariaLabel="speed-dial"
          sx={{ position: "absolute", bottom: "16px", right: "16px" }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => action.action()}
            />
          ))}
        </SpeedDial>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          sx={{ gap: "10px" }}
        >
          <OrderInfocard order={order} />
          <ClientInfoCard client={order?.client} />
        </Stack>
        <OrderTabs order={order} setOrder={setOrder} />
      </Main>
    </>
  );
};

export default EditOrder;

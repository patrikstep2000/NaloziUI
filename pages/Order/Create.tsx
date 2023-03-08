import type { NextPage } from "next";
import Main from "../../components/Containers/Main";
import Head from "next/head";
import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/system";
import RegisteredClientForm from "../../components/UI/RegisteredClientForm";
import OrderType from "../../models/Order/Order";
import { DBConnector } from "../../Connectors/MainDBConnector";
import { ApiUrls, UIUrls } from "../../components/Constants/URLs";
import { useRouter } from "next/router";
import UnregisteredClientForm from "../../components/UI/UnregisteredClientForm";

const initOrder: OrderType = {
  user: { id: 1 },
  client: undefined,
  unregistered_client: undefined,
  printers: [],
  unregistered_printers: [],
};

const CreateOrder: NextPage = () => {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(true);
  const [order, setOrder] = useState<OrderType>(initOrder);

  const onRadioGroupChange = (event: React.SyntheticEvent<Element, Event>) => {
    setOrder(initOrder);
    setIsRegistered(
      (event.target as HTMLInputElement).value === "registrirani"
    );
  };

  const onCreateOrder = async (event: React.SyntheticEvent<Element, Event>) => {
    setOrder((prev: OrderType) => {
      return isRegistered
        ? {
            ...prev,
            unregistered_printers: undefined,
          }
        : {
            ...prev,
            printers: undefined,
          };
    });

    DBConnector.post(ApiUrls.CreateOrder, order)
      .then((res) => router.push(`${UIUrls.OrderEdit}/${res.data}`))
      .catch(console.error);
  };

  return (
    <>
      <Head>
        <title>Kreiraj novi nalog</title>
        <meta name="description" content="Create order page" />
        <link rel="icon" href={process.env.PAGE_ICON_URL} />
      </Head>

      <Main>
        <Container>
          <Paper variant="outlined" sx={{ padding: "10px", marginTop: "15px" }}>
            <Stack direction="column">
              <Typography sx={{ margin: "15px 15px 0 15px" }}>
                Klijent:
              </Typography>
              <RadioGroup
                row
                defaultValue="registrirani"
                sx={{ margin: "15px" }}
                onChange={onRadioGroupChange}
              >
                <FormControlLabel
                  value="registrirani"
                  control={<Radio />}
                  label="Registrirani"
                />
                <FormControlLabel
                  value="neregistrirani"
                  control={<Radio />}
                  label="Neregistrirani"
                />
              </RadioGroup>
            </Stack>
            {isRegistered ? (
              <RegisteredClientForm order={order} setOrder={setOrder} />
            ) : (
              <UnregisteredClientForm order={order} setOrder={setOrder} />
            )}
          </Paper>

          {order.client || order.unregistered_client ? (
            <Button
              variant="outlined"
              size="large"
              sx={{ margin: "15px 0" }}
              onClick={onCreateOrder}
            >
              Otvori novi radni nalog
            </Button>
          ) : null}
        </Container>
      </Main>
    </>
  );
};

export default CreateOrder;

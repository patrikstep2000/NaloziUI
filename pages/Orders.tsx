import type { NextPage } from "next";
import Main from "../components/Containers/Main";
import Head from "next/head";
import Table from "../components/Containers/Reusable/Table";
import { OrderHeader } from "../models/Order/Order";
import FiltersBox from "../components/Containers/Reusable/FiltersBox";
import { Button } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { ApiUrls, UIUrls } from "../components/Constants/URLs";
import { DBConnector } from "../Connectors/MainDBConnector";
import { useReload } from "../components/Hooks/useReload";
import { OrderStatus } from "../components/Constants/Enums";

const Orders: NextPage = () => {
  const [searchValue, setSearchValue] = useState(null);
  const { isReload, reload } = useReload();
  const router = useRouter();

  const onItemOpen = (id: string) => {
    router.push(`${UIUrls.Order}/${id}`);
  };

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    router.push(`${UIUrls.OrderCreate}`);
  }

  const onItemEdit = (id: string) => {
    router.push(`${UIUrls.OrderEdit}/${id}`)
  };

  const onItemSign = (value: string, status: { name: string }) => {
    DBConnector.patch(
      ApiUrls.Order,
      {
        status:{
          id: status.name === "Potpisan"
            ? OrderStatus.Otvoren
            : OrderStatus.Potpisan,
        }
      },
      value
    ).then(reload);
  };

  return (
    <>
      <Head>
        <title>Nalozi</title>
        <meta name="description" content="Orders page" />
        <link rel="icon" href={process.env.PAGE_ICON_URL} />
      </Head>

      <Main>
        <Button
          variant="outlined"
          sx={{marginBottom:'20px'}}
          onClick={handleAdd}
        >Dodaj novi radni nalog</Button>
        <FiltersBox setSearchValue={setSearchValue} />
        <Table
          dataUrl="/orders"
          headCells={OrderHeader}
          reload={isReload}
          searchValue={searchValue}
          tableName="Nalozi"
          onActionButtonClickList={[
            { name: "Otvori", action: onItemOpen },
            {
              name: "Potpiši",
              action: onItemSign,
              field: "status",
              formatter: (value: { name: string }) => {
                if (value.name === "Potpisan") {
                  return "Makni potpis";
                }
                return "Potpiši";
              },
            },
            { 
              name: "Uredi",
              action: onItemEdit,
              field: 'status',
              disabled: (value: { name: string})  => {
                return value.name === 'Potpisan';
              }
            }
          ]}
        />
      </Main>
    </>
  );
};

export default Orders;

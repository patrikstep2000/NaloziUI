import { Button, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import OrderType from "../../models/Order/Order";
import OrderUnregisteredPrinterType, {
  OrderUnregisteredPrinterHeader,
} from "../../models/Printer/OrderUnregisteredPrinter";
import UnregisteredPrinterType, {
  UnregisteredPrinterHeader,
} from "../../models/Printer/UnregisteredPrinter";
import SimpleTable from "../Containers/Reusable/SimpleTable";

const UnregisteredClientForm: React.FC<{
  order: OrderType;
  setOrder: Dispatch<SetStateAction<OrderType>>;
}> = ({ order, setOrder }) => {
  const [modelValue, setModelValue] = useState("");
  const [serialNumberValue, setSerialNumberValue] = useState("");
  const [clientNameValue, setClientValue] = useState("");
  const unregistered_printer = useMemo<UnregisteredPrinterType>(() => {
    return {
      model: modelValue,
      serial_number: serialNumberValue,
    };
  }, [modelValue, serialNumberValue]);

  const onModelChange = (event: React.SyntheticEvent<Element, Event>) => {
    setModelValue((event.target as HTMLInputElement).value);
  };

  const onSerialNumberChange = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    setSerialNumberValue((event.target as HTMLInputElement).value);
  };

  const onUnregisteredPrinterAdd = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    setOrder((prev: OrderType) => {
      if (
        !prev.unregistered_printers ||
        modelValue === "" ||
        serialNumberValue === ""
      ) return prev;

      let valid = true;
      prev.unregistered_printers?.forEach((p) => {
        if (
          p.printer?.model === unregistered_printer.model &&
          p.printer.serial_number === unregistered_printer.serial_number
        ) {
          valid = false;
        }
      });

      valid && setModelValue("");
      valid && setSerialNumberValue("");

      return valid
        ? {
            ...prev,
            unregistered_printers: [
              ...prev.unregistered_printers,
              { printer: unregistered_printer },
            ],
          }
        : prev;
    });
  };

  const onClientChange = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setOrder((prev: OrderType) => {
      return {
        ...prev,
        unregistered_client: {
          name: (event.target as HTMLInputElement).value,
        },
      };
    });
  };

  const onRemoveUnregisteredPrinter = (
    printer: Partial<OrderUnregisteredPrinterType>
  ) => {
    setOrder((prev: OrderType) => {
      return {
        ...prev,
        unregistered_printers: prev.unregistered_printers?.filter(p => p.printer?.serial_number !== printer.printer?.serial_number)
      }
    });
  };

  return (
    <Stack>
      <TextField
        sx={{ margin: "15px" }}
        label="Klijent"
        value={order.unregistered_client?.name || ""}
        onChange={onClientChange}
      />
      <Stack direction="row">
        <TextField
          sx={{ width: "45%", margin: "15px" }}
          value={modelValue}
          onChange={onModelChange}
          label="Model"
        />
        <TextField
          sx={{ width: "45%", margin: "15px" }}
          value={serialNumberValue}
          onChange={onSerialNumberChange}
          label="Serijski broj"
        />
        <Button
          sx={{ width: "10%", margin: "15px" }}
          variant="outlined"
          color="success"
          onClick={onUnregisteredPrinterAdd}
        >
          Dodaj
        </Button>
      </Stack>
      {!!order?.unregistered_printers?.length && (
        <SimpleTable
          headCells={OrderUnregisteredPrinterHeader}
          rows={order.unregistered_printers}
          tableName="Neregistrirani"
          removable={true}
          removeFunction={onRemoveUnregisteredPrinter}
        />
      )}
    </Stack>
  );
};

export default UnregisteredClientForm;

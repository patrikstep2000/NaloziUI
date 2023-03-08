import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import OrderPrinterType from "../../models/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "../../models/Printer/OrderUnregisteredPrinter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AutocompleteFormatter } from "../../utils/AutocompleteFormatter";
import CounterType from "../../models/Counter";
import { PrinterType } from "../Constants/Enums";
import { Dispatch, SetStateAction, useState } from "react";
import { NumbersAboveZeroRegex } from "../../utils/Regex";
import OrderType from "../../models/Order/Order";

const CounterInput: React.FC<{
  printer: Partial<OrderPrinterType> 
  onCounterAdd: (counter: Partial<CounterType>) => (event: React.SyntheticEvent) => void;
}> = ({
  printer,
  onCounterAdd
}) => {
  const [bwInput, setBwInput] = useState(
    printer.counter?.bw_prints ? String(printer.counter?.bw_prints) : ""
  );
  const [colInput, setColInput] = useState(
    printer.counter?.color_prints ? String(printer.counter?.color_prints) : ""
  );

  const onBwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = NumbersAboveZeroRegex;
    const bwPrints = event.target.value;

    if(regex.test(bwPrints)) setBwInput(bwPrints);
  };

  const onColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = NumbersAboveZeroRegex;
    const colPrints = event.target.value;

    if(regex.test(colPrints)) setColInput(colPrints);
  };

  return (
    <Stack spacing={1} width="100%">
      {printer?.printer?.model?.type?.id === PrinterType.BW ? (
        <TextField value={bwInput} label="Crno-Bijelo" onChange={onBwChange} fullWidth />
      ) : (
        <Stack spacing={1} alignItems='center' >
          <TextField value={bwInput} label="Crno-Bijelo" onChange={onBwChange} fullWidth/>
          <TextField value={colInput} label="Boja" onChange={onColChange} fullWidth />
        </Stack>
      )}
      <Button onClick={onCounterAdd({bw_prints: Number(bwInput), color_prints: Number(colInput)})}>
        Spremi
      </Button>
    </Stack>
  );
};

const UnregisteredCounterInput: React.FC<{}> = ({}) => {
  return (<></>) 
}

const OrderCounterAccordion: React.FC<{
  printer: Partial<OrderPrinterType | OrderUnregisteredPrinterType>;
  setOrder: Dispatch<SetStateAction<Partial<OrderType>>>;
  isRegistered: boolean;
  expanded: number | undefined;
  onChange: (
    printer?: Partial<OrderPrinterType | OrderUnregisteredPrinterType>
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  formatter: AutocompleteFormatter;
}> = ({ printer, setOrder, isRegistered, expanded, onChange, formatter }) => {
  const setCounter = (counter: Partial<CounterType>) => (event: React.SyntheticEvent) => {
    setOrder((prev:Partial<OrderType>) => {


      return {
        ...prev,

      }
    })
  };

  return (
    <Accordion
      variant="outlined"
      expanded={expanded === printer.id}
      onChange={onChange(printer)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{formatter.format(printer)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
          {isRegistered ? <CounterInput printer={printer as OrderPrinterType} onCounterAdd={setCounter} /> : <UnregisteredCounterInput/>}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCounterAccordion;

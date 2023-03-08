import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import OrderMaterialType, {
  OrderMaterialHeader,
} from "../../models/Material/OrderMaterial";
import OrderPrinterType from "../../models/Printer/OrderPrinter";
import SimpleTable from "../Containers/Reusable/SimpleTable";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import MaterialType from "../../models/Material/MaterialType";
import { AutocompleteFormatter, MaterialAutocompleteFormatter } from "../../utils/AutocompleteFormatter";
import AdvancedAutocomplete from "../Containers/Reusable/AdvancedAutocomplete";
import OrderUnregisteredPrinterType from "../../models/Printer/OrderUnregisteredPrinter";
import PrinterType from "../../models/Printer/PrinterType";
import UnregisteredPrinterType from "../../models/Printer/UnregisteredPrinter";

const OrderPrinterAccordion: React.FC<{
  printer: Partial<OrderPrinterType | OrderUnregisteredPrinterType>;
  expanded: number | undefined;
  isRegistered: boolean;
  material: MaterialType | undefined;
  materials: Partial<MaterialType>[];
  materialLoading: boolean;
  amount: string;
  formatter: AutocompleteFormatter;
  onAccordionChange: (
    printer?: Partial<OrderPrinterType | OrderUnregisteredPrinterType>
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onMaterialChange: (event: React.SyntheticEvent, value?: any) => void;
  onMaterialAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaterialAdd: (
    isRegistered: boolean,
    printer_id?: number
  ) => (event: React.SyntheticEvent) => void;
  onMaterialRemove: (
    material: Partial<OrderMaterialType>,
    printer?: Partial<PrinterType | UnregisteredPrinterType>,
    isRegistered?: boolean
  ) => void;
}> = ({
  printer,
  expanded,
  isRegistered,
  material,
  materials,
  materialLoading,
  amount,
  formatter,
  onAccordionChange,
  onMaterialChange,
  onMaterialAmountChange,
  onMaterialAdd,
  onMaterialRemove
}) => {
  return (
    <Accordion
      variant="outlined"
      expanded={expanded === printer.id}
      onChange={onAccordionChange(printer)}
      key={printer?.printer?.serial_number}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{formatter.format(printer)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3} justifyContent="center" alignItems="center">
          <TextField label="Opis" fullWidth />
          <Stack direction="row" spacing={1} width="100%">
            <MaterialAutocomplete
              material={material}
              materials={materials}
              onLoading={materialLoading}
              onChange={onMaterialChange}
            />
            <TextField
              type="text"
              label="Količina"
              value={amount || ""}
              onChange={onMaterialAmountChange}
            />
            <IconButton
              sx={{ width: "55px" }}
              onClick={onMaterialAdd(isRegistered, printer.id)}
            >
              <AddBoxIcon fontSize="large" color="primary" />
            </IconButton>
          </Stack>
          {!!printer.material?.length && (
            <SimpleTable
              rows={printer?.material}
              headCells={OrderMaterialHeader}
              removable
              removeFunction={onMaterialRemove}
              parent={printer.printer}
              tag={isRegistered}
            />
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const MaterialAutocomplete: React.FC<{
  material: Partial<MaterialType> | undefined;
  materials: Partial<MaterialType>[];
  onLoading: boolean;
  onChange: (event: React.SyntheticEvent, value?: any) => void;
}> = ({
  material,
  materials,
  onLoading: materialLoading,
  onChange: onPrinterMaterialChange,
}) => {
  const [materialInput, setMaterialInput] = useState<string>("");

  const onPrinterMaterialInput = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setMaterialInput(value);
  };

  return (
    <>
      <AdvancedAutocomplete
        label="Materijali"
        formatter={MaterialAutocompleteFormatter}
        loading={materialLoading}
        options={materials}
        option={material || null}
        onInputChange={onPrinterMaterialInput}
        inputValue={materialInput || ""}
        onChange={onPrinterMaterialChange}
        sx={{ width: "80%" }}
      />
    </>
  );
};

export default OrderPrinterAccordion;

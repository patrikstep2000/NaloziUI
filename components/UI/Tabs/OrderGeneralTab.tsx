import { IconButton, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DBConnector } from "../../../Connectors/MainDBConnector";
import MaterialType from "../../../models/Material/Material";
import OrderMaterialType, {
  OrderMaterialHeader,
} from "../../../models/Material/OrderMaterial";
import OrderType from "../../../models/Order/Order";
import { MaterialAutocompleteFormatter } from "../../../utils/AutocompleteFormatter";
import { ApiUrls } from "../../Constants/URLs";
import AdvancedAutocomplete from "../../Containers/Reusable/AdvancedAutocomplete";
import SimpleTable from "../../Containers/Reusable/SimpleTable";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { NumbersAboveZeroRegex } from "../../../utils/Regex";

const OrderGeneralTab: React.FC<{
  order: Partial<OrderType>;
  setOrder: Dispatch<SetStateAction<Partial<OrderType>>>;
}> = ({ order, setOrder }) => {
  const [materials, setMaterials] = useState<Partial<MaterialType>[]>([]);
  const [materialLoading, setMaterialLoading] = useState(false);
  const [material, setMaterial] = useState<MaterialType>();
  const [materialInput, setMaterialInput] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    (async () => {
      setMaterialLoading(true);

      await DBConnector.get(`${ApiUrls.Material}`)
      .then((result) =>
        setMaterials(
          result.data.data?.filter((material: Partial<MaterialType>) => {
            let valid = true;
            order.material?.forEach(
              (m) => (valid = m.material?.id === material.id)
            );
            return valid
          })
        )
      )
      .catch(console.error);

      setMaterialLoading(false);
    })
  }, []);

  const onWorkDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prev: Partial<OrderType>) => {
      return {
        ...prev,
        work_details: event.target.value,
      };
    });
  };

  const onMaterialChange = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setMaterial(value);
  };

  const onMaterialInput = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setMaterialInput(value);
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = NumbersAboveZeroRegex;
    const amount = event.target.value;

    if(regex.test(amount)) setAmount(amount);
  };

  const onMaterialadd = () => {
    if (!material || amount === "") return;

    setOrder((prev: Partial<OrderType>) => {
      if (!prev.material) return prev;

      return {
        ...prev,
        material: [
          ...prev.material,
          {
            material: material,
            amount: Number(amount),
          },
        ],
      };
    });

    setMaterials((prev) => prev.filter((m) => m.id !== material.id));
    setMaterial(undefined);
    setMaterialInput("");
    setAmount("");
  };

  const onMaterialRemove = (material: OrderMaterialType) => {
    setMaterials((prev: Partial<MaterialType>[]) => [
      ...prev,
      material.material,
    ]);
    setOrder((prev: Partial<OrderType>) => {
      if (!prev.material) return prev;

      return {
        ...prev,
        material: prev.material.filter(
          (m) => m.material?.id !== material.material.id
        ),
      };
    });
  };

  return (
      <Stack>
        <TextField
          label='Opis'
          fullWidth
          value={order?.work_details ?? ""}
          onChange={onWorkDetailsChange}
          multiline
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ margin: "50px 0 10px 0", width: "100%" }}
        >
          <AdvancedAutocomplete
            label="Materijali"
            formatter={MaterialAutocompleteFormatter}
            loading={materialLoading}
            options={materials}
            option={material || null}
            onInputChange={onMaterialInput}
            inputValue={materialInput || ""}
            onChange={onMaterialChange}
            sx={{ width: "80%" }}
          />
          <TextField
            type="text"
            label="Količina"
            value={amount}
            onChange={onAmountChange}
          />
          <IconButton sx={{ width: "55px" }} onClick={onMaterialadd}>
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Stack>
        {!!order.material?.length && (
          <SimpleTable
            rows={order?.material}
            headCells={OrderMaterialHeader}
            removable
            removeFunction={onMaterialRemove}
          />
        )}
      </Stack>
  );
};

export default OrderGeneralTab;

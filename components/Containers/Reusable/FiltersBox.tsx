import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";

const Box = styled.div`
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;
  margin: 20px 0px;
  padding: 20px 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 2px black;
`;

const DateTimeBox = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 20px 0px;
  display: flex;
  gap: 30px;
`;

const FiltersBox: React.FC<{ setSearchValue: Function }> = ({
  setSearchValue,
}) => {
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);

  const updateSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
  }, 200);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearch(event.target.value);
  };

  const onStartDateTimeChange = (newValue: Dayjs | null) => {
    setStartDateTime(newValue);
  };

  const onEndDateTimeChange = (newValue: Dayjs | null) => {
    setEndDateTime(newValue);
  };

  return (
    <Box>
      <TextField
        onChange={handleSearchChange}
        style={{ width: "300px" }}
        id="outlined-basic"
        label="Pretraži"
        variant="outlined"
      />
      <DateTimeBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Od datuma:"
            value={startDateTime}
            onChange={onStartDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="Do datuma:"
            value={endDateTime}
            onChange={onEndDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </DateTimeBox>
      <Button variant="contained">Prikaži sve</Button>
    </Box>
  );
};

export default FiltersBox;

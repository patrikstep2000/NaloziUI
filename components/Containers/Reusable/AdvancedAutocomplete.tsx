import { Autocomplete, TextField, CircularProgress, SxProps, Theme, Box } from "@mui/material";
import React from "react";
import { AutocompleteFormatter } from "../../../utils/AutocompleteFormatter";

const AdvancedAutocomplete: React.FC<{
  key?: React.Key | undefined | null;
  label: string;
  formatter: AutocompleteFormatter;
  options: any[];
  loading?: boolean
  option?: any;
  inputValue?: string;
  sx?: SxProps<Theme>;
  onChange?: (event: React.SyntheticEvent<Element, Event>, value?: any) => void;
  onInputChange?: (event: React.SyntheticEvent<Element, Event>, value?: any) => void;
}> = ({ key, label, option, inputValue, options, loading, formatter, onChange, onInputChange, sx }) => {

  return (
    <Box sx={sx ?? undefined}>
      <Autocomplete
        key={key}  
        onChange={onChange}
        onInputChange={onInputChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => formatter.format(option)}
        options={options}
        loading={loading}
        value={option}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            {...params}
            size='medium'
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default AdvancedAutocomplete;

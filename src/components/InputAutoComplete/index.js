import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const InputAutoComplete = ({
  options,
  disabled,
  loading,
  setData,
  data,
  label,
  width = "30%",
}) => {
  return (
    <Autocomplete
      className="combo-box-demo"
      disabled={disabled}
      loading={loading}
      options={options}
      getOptionLabel={(option) => option.label}

      style={{
        width: width,
        margin: "auto 0",
        marginRight: 20,
      }}
      onChange={(e, obj) => {
        setData(obj?.value ? obj?.value : obj?.label ? obj?.label : "");
      }}
      renderInput={(params, teste) => {
        return (
          <TextField
            {...params}
            label={label}
            value={data}
            variant="outlined"
            disabled={true}
          />
        );
      }}
    />
  );
};

export default InputAutoComplete;

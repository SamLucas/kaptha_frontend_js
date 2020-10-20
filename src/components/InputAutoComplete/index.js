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
}) => {
  return (
    <Autocomplete
      id="debug"
      debug
      disabled={disabled}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.label}
      onSelectCapture={(e) => {
        const txt = e.target.value;
        setData(txt);
      }}
      style={{
        width: "30%",
        margin: "auto 0",
        // marginLeft: 10,
        marginRight: 20,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={data}
          onChange={(e) => setData(e.target.value)}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default InputAutoComplete;

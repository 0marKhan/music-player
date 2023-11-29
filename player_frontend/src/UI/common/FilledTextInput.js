import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

const FilledTextInput = forwardRef((props, ref) => (
  <TextField
    inputRef={ref}
    {...props}
    sx={{
      "& label.Mui-focused": {
        color: "#fff",
      },
      "& label": {
        color: "#fff",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "#fff",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: "#fff",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#e30085",
      },
      "& .MuiInputBase-input": {
        color: "#fff",
      },
    }}
  />
));

export default FilledTextInput;

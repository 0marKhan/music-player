import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const TextInput = styled(TextField)(({ theme, error }) => ({
  width: "25rem",
  textAlign: "center",
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2e2e2e",
    "& fieldset": {
      borderColor: error ? "red" : "#999", // Set borderColor to red on error
      borderWidth: "2px",
      transition: "border-color 0.2s",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "red" : "#e30085", // Set borderColor to red on error
      borderWidth: "2px",
      "&:not(.Mui-error)": {
        borderBottom: error ? "2px solid red" : "2px solid #e30085", // Set borderBottom to red on error
      },
    },
  },
  "& label.Mui-focused": {
    color: error ? "red" : "#fff", // Set label color to red on error
  },
  "& label": {
    color: error ? "red" : "#fff", // Set label color to red on error
  },

  "@media (max-width: 415px)": {
    width: "20rem",
  },
}));

export default TextInput;

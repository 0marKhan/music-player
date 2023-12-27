import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const PasswordInput = styled(TextField)(({ theme }) => ({
  width: "25rem",
  textAlign: "center",
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2e2e2e",
    "& fieldset": {
      borderColor: "#999",
      borderWidth: "2px",
      transition: "border-color 0.2s",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e30085",
      borderWidth: "2px",
      "&:not(.Mui-error)": {
        borderBottom: "2px solid #e30085",
      },
    },
  },
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& label": {
    color: "#fff",
  },

  "@media (max-width: 415px)": {
    width: "20rem",
  },
}));

const HiddenPasswordInput = (props) => {
  return <PasswordInput type="password" {...props} />;
};

export default HiddenPasswordInput;

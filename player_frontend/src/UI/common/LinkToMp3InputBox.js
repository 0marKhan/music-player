import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import React from "react";

const LinkToMp3InputBox = React.forwardRef(({ ...props }, ref) => (
  <StyledLinkToMp3InputBox inputRef={ref} {...props} />
));

const StyledLinkToMp3InputBox = styled(TextField)(({ theme }) => ({
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

export default LinkToMp3InputBox;

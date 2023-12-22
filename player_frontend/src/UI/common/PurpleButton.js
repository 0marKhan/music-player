import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PurpleButton = styled(Button)({
  borderColor: "#e30085",
  color: "#fff",
  backgroundColor: "#e30085",
  width: "25rem", // Default width

  "&:hover": {
    backgroundColor: "#c80078",
    borderColor: "#e30085",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#c80078",
    borderColor: "#e30085",
    boxShadow: "none",
  },

  "@media (max-width: 415px)": {
    width: "20rem",
  },
});

export default PurpleButton;

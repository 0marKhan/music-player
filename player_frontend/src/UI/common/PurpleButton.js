import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PurpleButton = styled(Button)({
  borderColor: "#e30085",
  color: "#fff",
  backgroundColor: "#e30085",

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
});

export default PurpleButton;

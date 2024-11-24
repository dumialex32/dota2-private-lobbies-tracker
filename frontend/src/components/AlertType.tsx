import Alert from "@mui/material/Alert";

type type = "info" | "warning" | "error" | "success";

const AlertType: React.FC<{ type: type; msg: string }> = ({ type, msg }) => {
  return <Alert severity={type}>{msg}.</Alert>;
};

export default AlertType;

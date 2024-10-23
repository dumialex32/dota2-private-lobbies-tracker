import Alert from "@mui/material/Alert";

type type = "info" | "warning" | "error" | "success";

const Error: React.FC<{ type: type; msg: string }> = ({ type, msg }) => {
  return <Alert severity={type}>{msg}.</Alert>;
};

export default Error;

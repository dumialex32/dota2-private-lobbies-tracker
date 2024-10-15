import { ReactNode } from "react";

const Button: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}> = ({ children, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

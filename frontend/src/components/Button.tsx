import { ReactNode } from "react";

const Button: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

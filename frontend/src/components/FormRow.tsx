import { cloneElement, ReactElement } from "react";

const FormRow: React.FC<{ children: ReactElement; label: string }> = ({
  children,
  label,
}) => {
  const childWithClass = cloneElement(children, {
    className:
      "py-1 px-2 focus:outline-none focus:ring-2 focus:ring-dota-logo-color rounded-md",
  });

  return (
    <div className="flex items-center gap-2">
      <label className="text-white text-sm">{label}</label>
      {childWithClass}
    </div>
  );
};

export default FormRow;

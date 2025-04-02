import { cloneElement, ReactElement } from "react";

const MapOrientation = {
  horizontal: "flex items-center gap-2",
  vertical: "flex flex-col gap-2",
};

const FormRow: React.FC<{
  children: ReactElement;
  label: string;
  orientation?: "horizontal" | "vertical";
}> = ({ children, label, orientation = "horizontal" }) => {
  const childWithClass = cloneElement(children, {
    className:
      "py-1 px-2 max-w-[5rem] md:max-w-full focus:outline-none focus:ring-2 focus:ring-dota-logo-color rounded-md",
  });

  return (
    <div
      className={`flex flex-col md:flex-row  ${MapOrientation[orientation]}`}
    >
      <label className="text-white text-sm">{label}</label>

      {childWithClass}
    </div>
  );
};

export default FormRow;

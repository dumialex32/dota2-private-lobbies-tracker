import { ReactNode } from "react";
import { Link } from "react-router-dom";

const LobbyTab: React.FC<{
  trophy: string;
  tabLogo: string;
  to: string;
  children: ReactNode;
  active: boolean;
}> = ({ trophy, tabLogo, to, children, active }) => {
  return (
    <Link
      to={`/${to}`}
      className={`grid grid-cols-3 bg-lobby-tab rounded-md hover:opacity-75 transition-all duration-300 text-white ${
        active ? "text-custom-blue  opacity-75" : ""
      }`}
    >
      <div className="">
        <img src={tabLogo} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col items-center jus gap-1 pt-2">
        {children}
      </div>
      <div className="">
        <img src={trophy} className="w-full h-full object-contain" />
      </div>
    </Link>
  );
};

export default LobbyTab;

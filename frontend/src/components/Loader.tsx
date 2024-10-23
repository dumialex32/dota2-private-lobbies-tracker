import { Rings } from "react-loader-spinner";

const Loader: React.FC<{ height?: string; width?: string }> = ({
  height = "120",
  width = "120",
}) => {
  return (
    <div className="flex items-center justify-center">
      <Rings
        visible={true}
        height={height}
        width={width}
        color="#AB2E17"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;

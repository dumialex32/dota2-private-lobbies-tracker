import { Rings } from "react-loader-spinner";

const Loader: React.FC<{ height: string; width: string }> = ({
  height,
  width,
}) => {
  return (
    <Rings
      visible={true}
      height={height}
      width={width}
      color="#AB2E17"
      ariaLabel="rings-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;

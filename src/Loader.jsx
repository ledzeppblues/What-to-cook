import { TailSpin } from "react-loader-spinner";

const LoaderComp = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      visible={true}
    />
  );
};

export default LoaderComp;

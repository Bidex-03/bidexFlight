import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import SpinnerMini from "../ui/SpinnerMini";
import { Button } from "../ui/Button";

const SignOut = () => {
  const { logout, isLoading } = useLogout();
  return (
    <Button disabled={isLoading} onClick={logout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </Button>
  );
};

export default SignOut;

import { useAuthContext } from "./useAuthContext";
import { useQueryClient } from "react-query";
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    queryClient.clear();
  };

  return { logout };
};

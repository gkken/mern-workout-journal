import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/user/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
    }
  };

  return { login, error, isLoading };
};

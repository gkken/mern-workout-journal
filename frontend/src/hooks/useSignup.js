import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user && navigate("/home");
  }, [user]);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/signup",
        {
          email,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
    }
  };

  return { signup, isLoading, error };
};

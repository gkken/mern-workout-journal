import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();

    await login(email, password);
  };

  useEffect(() => {
    user && navigate("/home");
  }, [user]);

  return (
    <MainLayout>
      <div className="p-10 bg-[#f1f1f1] h-[90%] flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="mt-20 flex flex-col space-y-3 bg-white w-11/12 p-5 max-w-xl rounded-lg"
        >
          <h3 className="font-extrabold text-lg">Login</h3>
          <label htmlFor="">Email:</label>
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="border-[1px] border-black rounded-md p-1"
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="border-[1px] border-black rounded-md p-1"
          />
          {error && <div className="text-red-500">{error}</div>}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-green-400 w-28 h-9 rounded-md font-semibold text-white hover:bg-green-600 self-center"
          >
            Login
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;

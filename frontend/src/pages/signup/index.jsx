import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import MainLayout from "../../components/MainLayout";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async e => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <MainLayout>
      <div className="p-10 bg-[#f1f1f1] h-[90%] flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="mt-20 flex flex-col space-y-3 bg-white w-11/12 p-5 max-w-xl rounded-lg"
        >
          <h3 className="font-extrabold text-lg">Sign Up</h3>
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
            className="bg-green-400 w-28 h-9 rounded-md font-semibold text-white hover:bg-green-600 self-center mt-10
        "
          >
            Sign Up
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Signup;

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  function handleLogout() {
    logout();
  }
  return (
    <header className="bg-white h-[10%] max-w-5xl m-auto flex flex-col justify-center">
      <div className="flex items-center justify-between py-3 px-5">
        <Link to={"/"}>
          <h1 className="text-3xl font-extrabold">Workout Buddy!</h1>
        </Link>
        <nav className="flex space-x-5 items-center">
          {user ? (
            <div className="space-x-3">
              <span>{user.email}</span>
              <button
                className="border-2 border-green-300 text-green-300 p-2 hover:border-green-400 hover:text-green-400"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="space-x-5">
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

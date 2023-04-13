import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;

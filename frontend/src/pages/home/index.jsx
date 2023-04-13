import MainLayout from "../../components/MainLayout";
import HomeBody from "../../components/Home";

const Home = () => {
  return (
    <div className="h-screen">
      <MainLayout>
        <HomeBody />
      </MainLayout>
    </div>
  );
};

export default Home;

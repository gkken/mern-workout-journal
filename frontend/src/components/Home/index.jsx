import { useQuery } from "react-query";
import axios from "axios";
import WorkoutCard from "../WorkoutCard";
import AddWorkout from "../AddWorkout";
import { useAuthContext } from "../../hooks/useAuthContext";

const HomeBody = () => {
  const { user } = useAuthContext();
  const { isLoading, isError, data, error, refetch } = useQuery(
    "workouts",
    () => {
      if (!user) throw Error("Unauthorized. Please log in.");

      return axios
        .get("http://localhost:8081/api/workouts", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then(res => res.data);
    }
  );

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred: " + error.message;

  return (
    <div className="bg-[#f1f1f1] h-[90%] flex flex-row justify-center p-10 space-x-10">
      <div className=" max-w-5xl flex-grow">
        {/* <h1 className="text-2xl font-bold">Home</h1> */}
        {data.map(workout => (
          <WorkoutCard
            key={workout._id}
            id={workout._id}
            title={workout.title}
            reps={workout.reps}
            load={workout.load}
            timestamp={workout.createdAt}
          />
        ))}
      </div>
      <AddWorkout />
    </div>
  );
};

export default HomeBody;

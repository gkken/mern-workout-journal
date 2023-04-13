import axios from "axios";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutCard = ({ title, reps, load, timestamp, id }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { mutate } = useMutation({
    mutationFn: () => {
      if (!user) return;
      return axios
        .delete("http://localhost:8081/api/workouts/" + id, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });

  function handleDelete() {
    mutate();
  }

  return (
    <div className="bg-white drop-shadow rounded-md p-5 space-y-2 mb-3 relative">
      <h1 className="capitalize font-bold text-2xl">{title}</h1>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p>{dayjs(timestamp).format("DD MMM YYYY")}</p>
      <button onClick={handleDelete} className="absolute top-5 right-5">
        Delete
      </button>
    </div>
  );
};

export default WorkoutCard;

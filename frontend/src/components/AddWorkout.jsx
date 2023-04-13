import { useMutation, useQueryClient } from "react-query";
import { useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const AddWorkout = () => {
  const [APIError, setAPIError] = useState(null);
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: post => {
      if (!user) {
        setAPIError("You must be logged in.");
        return;
      }
      return axios
        .post("http://localhost:8081/api/workouts", post, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then(res => res.data);
    },
    onSuccess: newWorkout => {
      setAPIError(null);
      console.log(newWorkout._id);
      queryClient.invalidateQueries(["workouts"]);
      // queryClient.setQueryData(["workouts", newWorkout._id], newWorkout);
    },
    onError: error => {
      setAPIError(error.response.data.error);
    },
  });
  const formData = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const { workoutTitle, load, reps } = formData.current;
    mutate({
      title: workoutTitle.value,
      load: load.value,
      reps: reps.value,
    });
    e.target.reset();
  };

  return (
    <form
      ref={formData}
      onSubmit={handleSubmit}
      className="flex flex-col space-y-5 max-w-sm"
    >
      <h1 className="font-bold text-2xl">Add a New Workout</h1>

      <label className="font-semibold text-lg">Exercise Title:</label>
      <input type="text" name="workoutTitle" className="rounded-md p-2" />

      <label className="font-semibold text-lg">Load (KG):</label>
      <input type="number" name="load" className="rounded-md p-2" />

      <label className="font-semibold text-lg">Reps:</label>
      <input type="number" name="reps" className="rounded-md p-2" />

      <button
        className="bg-green-400 w-28 h-9 rounded-md font-semibold text-white hover:bg-green-600
        "
        type="submit"
      >
        Submit
      </button>
      {APIError && (
        <div className="border-[1px] border-black p-3 bg-[#ffefef] rounded-md">
          {APIError}
        </div>
      )}
    </form>
  );
};

export default AddWorkout;

import React from "react";
import { removeWorkout, removeSet, changeSet } from "features/workouts/slice";
import Select from "components/Select";
import { Grid } from "@chakra-ui/core";
import { useDispatch } from "react-redux";

export default function SetRow(props) {
  const {
    reps,
    rpe,
    sets,
    id: setId,
    setIdx,
    arr,
    workoutId,
    liftName
  } = props;

  const dispatch = useDispatch();

  function handleWorksetChange({ e, workoutId, setId }) {
    e.persist();
    const { name, value } = e.target;
    dispatch(changeSet({ workoutId, setId, name, value }));
  }

  return (
    <Grid key={setId} my="2" gridGap="2" gridTemplateColumns="1fr 1fr 1fr">
      <Select
        name="reps"
        onChange={e => handleWorksetChange({ e, workoutId, setId })}
        defaultValue={reps}
        useReps
      />
      <Select
        name="rpe"
        onChange={e => handleWorksetChange({ e, workoutId, setId })}
        defaultValue={rpe}
        useRpe
      />
      <Select
        name="sets"
        defaultValue={sets}
        useSets
        onChange={e => {
          if (e.target.value === "-") {
            if (setIdx === 0 && arr.length === 1) {
              dispatch(removeWorkout({ id: workoutId }));
            } else {
              dispatch(removeSet({ workoutId, setIdx }));
            }
          } else {
            handleWorksetChange({ e, workoutId, setId });
          }
        }}
      />
    </Grid>
  );
}

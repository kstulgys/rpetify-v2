import { createSlice } from "redux-starter-kit";
import uuid from "uuid/v4";

const workoutsSlice = createSlice({
  slice: "workouts",
  initialState: [{ ...getNewLift() }],
  reducers: {
    addWorkout(state, action) {
      state.push({ ...getNewLift() });
    },
    removeWorkout(state, action) {
      return state.filter(w => w.id !== action.payload.id);
    },
    addSet(state, action) {
      const workout = state.find(w => w.id === action.payload.id);
      workout.sets.push({ ...getNewSet() });
    },
    removeSet(state, action) {
      const { workoutId, setIdx } = action.payload;
      const workout = state.find(w => w.id === workoutId);
      workout.sets.splice(setIdx, 1);
    },
    changeSet(state, action) {
      const { workoutId, setId, name, value } = action.payload;
      const workout = state.find(w => w.id === workoutId);
      const set = workout.sets.find(s => s.id === setId);
      set[name] = Number(value);
    },
    changeWorkoutName(state, action) {
      const { workoutId, value } = action.payload;
      const workout = state.find(w => w.id === workoutId);
      workout.name = value;
    }
  }
});

export const {
  addWorkout,
  removeWorkout,
  addSet,
  removeSet,
  changeSet,
  changeWorkoutName
} = workoutsSlice.actions;
export default workoutsSlice.reducer;

function getNewSet() {
  return {
    id: uuid(),
    reps: 6,
    rpe: 8,
    sets: 3
  };
}

function getNewLift() {
  return {
    id: uuid(),
    name: "Squat",
    sets: [
      {
        id: uuid(),
        reps: 6,
        rpe: 6.5,
        sets: 1
      },
      {
        id: uuid(),
        reps: 6,
        rpe: 7,
        sets: 1
      },
      {
        id: uuid(),
        reps: 6,
        rpe: 8,
        sets: 3
      }
    ]
  };
}

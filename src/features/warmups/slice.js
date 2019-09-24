import { createSlice } from "redux-starter-kit";
import uuid from "uuid/v4";

const warmupsSlice = createSlice({
  slice: "warmups",
  initialState: { list: [...getDefaultWarmups()], current: 0 },
  reducers: {
    // addWorkout(state, action) {
    //   state.push({ ...getNewLift() });
    // },
    // removeWorkout(state, action) {
    //   return state.filter(w => w.id !== action.payload.id);
    // },
    // addSet(state, action) {
    //   const workout = state.find(w => w.id === action.payload.id);
    //   workout.sets.push({ ...getNewSet() });
    // },
    // removeSet(state, action) {
    //   const { workoutId, setIdx } = action.payload;
    //   const workout = state.find(w => w.id === workoutId);
    //   workout.sets.splice(setIdx, 1);
    // },
    // changeSet(state, action) {
    //   const { workoutId, setId, name, value } = action.payload;
    //   const workout = state.find(w => w.id === workoutId);
    //   const set = workout.sets.find(s => s.id === setId);
    //   set[name] = value;
    // },
    // changeWorkoutName(state, action) {
    //   const { workoutId, value } = action.payload;
    //   const workout = state.find(w => w.id === workoutId);
    //   workout.name = value;
    // }
  }
});

// export const {
//   // addWorkout,
//   // removeWorkout,
//   // addSet,
//   // removeSet,
//   // changeSet,
//   // changeWorkoutName
// } = warmupsSlice.actions;
export default warmupsSlice.reducer;

function getNewSet() {
  return {
    id: uuid(),
    reps: 6,
    rpe: 8,
    sets: 3
  };
}

function getDefaultWarmups() {
  return [
    {
      id: uuid(),
      sets: [
        {
          id: uuid(),
          sets: 5,
          reps: 5,
          percent: 0
        },
        {
          id: uuid(),
          sets: 1,
          reps: 5,
          percent: 0.5
        },
        {
          id: uuid(),
          sets: 1,
          reps: 3,
          percent: 0.65
        },
        {
          id: uuid(),
          sets: 1,
          reps: 2,
          percent: 0.85
        }
      ]
    },
    {
      id: uuid(),
      sets: [
        {
          id: uuid(),
          sets: 5,
          reps: 5,
          percent: 0
        },
        {
          id: uuid(),
          sets: 1,
          reps: 5,
          percent: 0.5
        },
        {
          id: uuid(),
          sets: 1,
          reps: 3,
          percent: 0.8
        },
        {
          id: uuid(),
          sets: 1,
          reps: 1,
          percent: 1.05
        }
      ]
    }
  ];
}

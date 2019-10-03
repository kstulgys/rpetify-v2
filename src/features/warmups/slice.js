import { createSlice } from "redux-starter-kit";
import uuid from "uuid/v4";

const warmupsSlice = createSlice({
  slice: "warmups",
  initialState: { list: [...getDefaultWarmups()], current: 0 },
  reducers: {}
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

function getDefaultWarmups() {
  return [
    {
      id: uuid(),
      sets: [
        {
          id: uuid(),
          sets: 1,
          reps: 15,
          percent: 0
        },
        {
          id: uuid(),
          sets: 1,
          reps: 8,
          percent: 0.6
        },
        {
          id: uuid(),
          sets: 1,
          reps: 5,
          percent: 0.75
        },
        {
          id: uuid(),
          sets: 1,
          reps: 3,
          percent: 0.85
        },
        {
          id: uuid(),
          sets: 1,
          reps: 1,
          percent: 0.95
        }
      ]
    }
  ];
}

import { createSlice } from "redux-starter-kit";
import uuid from "uuid/v4";

const oneRepMaxSlice = createSlice({
  slice: "oneRepMax",
  initialState: [...defaultOneRepMaxes()],
  reducers: {
    changeOneRepMax(state, action) {
      const { id, name, value } = action.payload;
      const lift = state.find(l => l.id === id);
      lift[name] = value;
    }
  }
});

export const { changeOneRepMax } = oneRepMaxSlice.actions;
export default oneRepMaxSlice.reducer;

function defaultOneRepMaxes() {
  return [
    {
      id: uuid(),
      name: "Squat",
      shortName: "SQ",
      reps: 5,
      rpe: 10,
      weight: 365,
      oneRM: 423
    },
    {
      id: uuid(),
      name: "Deadlift",
      shortName: "DL",
      reps: 5,
      rpe: 10,
      weight: 415,
      oneRM: 481
    },
    {
      id: uuid(),
      name: "B-Press",
      shortName: "BP",
      reps: 5,
      rpe: 10,
      weight: 280,
      oneRM: 324
    },
    {
      id: uuid(),
      name: "O-Press",
      shortName: "OP",
      reps: 5,
      rpe: 10,
      weight: 185,
      oneRM: 214
    }
  ];
}
